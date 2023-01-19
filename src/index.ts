import { default as request } from './helpers/request.js';
import { CurrencyCode } from './helpers/CurrencyCode.js';
export { CurrencyCode } from './helpers/CurrencyCode.js';

const DATA_URL = 'https://raw.githubusercontent.com/suchlab/currenzy/main/data/rates.json';
const RATES_CACHE_RESULT_DURATION_HOURS = 5;

type Rates = {
	[key in CurrencyCode]: number;
};

let rates: Rates;
let updatedAt: number;

export default class Currenzy {
	baseCurrency: CurrencyCode;

	constructor(baseCurrency: CurrencyCode = CurrencyCode.EUR) {
		this.refreshRates();
		this.baseCurrency = baseCurrency;
	};

	// Utils
	private validResults(): boolean {
		const cacheThresholdMilliseconds = RATES_CACHE_RESULT_DURATION_HOURS * 60 * 60 * 1000;
		const resultsValidTime = updatedAt && Date.now() < updatedAt + cacheThresholdMilliseconds;

		return !!resultsValidTime;
	};

	// Refresh rates
	async refreshRates(): Promise<boolean> {
		const result = await request({ url: DATA_URL });

		if (result.error) {
			throw new Error(result.error);
		}

		rates = result;
		updatedAt = Date.now();

		return true;
	};

	// Make conversion
	async convert(amount: number = 0, currency: CurrencyCode = CurrencyCode.USD): Promise<number> {
		const result = await this.conversion(this.baseCurrency, amount, currency);
		return result;
	}

	private async conversion(fromCurrency: CurrencyCode = CurrencyCode.EUR, fromAmount: number = 0, toCurrency: CurrencyCode = CurrencyCode.USD): Promise<number> {
		if (!rates || !this.validResults()) {
			await this.refreshRates();
		}

		// Check currencies exist
		if (!rates[fromCurrency]) throw new Error('Currency does not exist: ' + fromCurrency);
		if (!rates[toCurrency]) throw new Error('Currency does not exist: ' + toCurrency);

		const fromCurrencyBase = rates[fromCurrency];
		const toCurrencyBase = rates[toCurrency];

		const rate = (1 / fromCurrencyBase) * toCurrencyBase;

		const conversion = rate * fromAmount;

		return conversion;
	};
};

import { default as requestHelper, RequestParameters } from './helpers/request.js';

const DATA_URL = 'https://raw.githubusercontent.com/currenzy/currenzy/main/data/rates.json';

let data: any;

export default class Currenzy {
	rates: any;
	baseCurrency: String;


	constructor(baseCurrency: String = 'EUR') {
		this.refreshRates();
		this.baseCurrency = baseCurrency.toUpperCase();
	}

	// Utils
	async request(path: string = '', parameters: RequestParameters = {}) {
		return await requestHelper({
			url: `${path}`,
			...parameters,
		});
	}

	// Refresh rates
	async refreshRates() {
		data = await requestHelper({ url: DATA_URL });

		if (data.error) {
			throw new Error(data.error);
		}

		this.rates = data;
	};

	// Make conversion
	async convert(amount: number = 0, currency: String = 'USD') {
		const result = await this.conversion(this.baseCurrency, amount, currency);
		return result;
	}

	private async conversion(fromCurrency: String = 'EUR', fromAmount: number = 0, toCurrency: String = 'USD') {
		if (!this.rates) {
			await this.refreshRates();
		}

		// Check currencies exist
		if (!this.rates[fromCurrency.toUpperCase()]) throw new Error('Currency does not exist: ' + fromCurrency);
		if (!this.rates[toCurrency.toUpperCase()]) throw new Error('Currency does not exist: ' + toCurrency);

		const fromCurrencyBase = this.rates[fromCurrency.toUpperCase()];
		const toCurrencyBase = this.rates[toCurrency.toUpperCase()];

		const rate = (1 / fromCurrencyBase) * toCurrencyBase;

		const conversion = rate * fromAmount;

		return conversion;
	};
};

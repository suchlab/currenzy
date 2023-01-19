import { default as request } from './helpers/request.js';

const DATA_URL = 'https://raw.githubusercontent.com/suchlab/currenzy/main/data/rates.json';
const RATES_CACHE_RESULT_DURATION_HOURS = 5;

export type CurrencyCode = 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ANG' | 'AOA' | 'ARS' | 'AUD' | 'AWG' | 'AZN' | 'BAM' | 'BBD' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BMD' | 'BND' | 'BOB' | 'BRL' | 'BSD' | 'BTC' | 'BTN' | 'BWP' | 'BYN' | 'BYR' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CUC' | 'CUP' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DZD' | 'EGP' | 'ERN' | 'ETB' | 'EUR' | 'FJD' | 'FKP' | 'GBP' | 'GEL' | 'GGP' | 'GHS' | 'GIP' | 'GMD' | 'GNF' | 'GTQ' | 'GYD' | 'HKD' | 'HNL' | 'HRK' | 'HTG' | 'HUF' | 'IDR' | 'ILS' | 'IMP' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JEP' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KGS' | 'KHR' | 'KMF' | 'KPW' | 'KRW' | 'KWD' | 'KYD' | 'KZT' | 'LAK' | 'LBP' | 'LKR' | 'LRD' | 'LSL' | 'LTL' | 'LVL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MNT' | 'MOP' | 'MRO' | 'MUR' | 'MVR' | 'MWK' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PEN' | 'PGK' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SBD' | 'SCR' | 'SDG' | 'SEK' | 'SGD' | 'SHP' | 'SLE' | 'SLL' | 'SOS' | 'SRD' | 'STD' | 'SVC' | 'SYP' | 'SZL' | 'THB' | 'TJS' | 'TMT' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'USD' | 'UYU' | 'UZS' | 'VEF' | 'VES' | 'VND' | 'VUV' | 'WST' | 'XAF' | 'XAG' | 'XAU' | 'XCD' | 'XDR' | 'XOF' | 'XPF' | 'YER' | 'ZAR' | 'ZMK' | 'ZMW' | 'ZWL';

type Rates = {
	[key in CurrencyCode]: number;
};

let rates: Rates;
let updatedAt: number;

export default class Currenzy {
	baseCurrency: CurrencyCode;

	constructor(baseCurrency: CurrencyCode = 'EUR') {
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
	async convert(amount: number = 0, currency: CurrencyCode = 'USD'): Promise<number> {
		const result = await this.conversion(this.baseCurrency, amount, currency);
		return result;
	}

	private async conversion(fromCurrency: CurrencyCode = 'EUR', fromAmount: number = 0, toCurrency: CurrencyCode = 'USD'): Promise<number> {
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

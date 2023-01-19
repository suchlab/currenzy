#! /usr/bin/env node
import Currenzy from '../dist/esm/index.js';

const args = process.argv.slice(2);
const [fromAmount, fromCurrency, targetCurrency] = args;

if (!fromAmount || !fromCurrency || !targetCurrency) {
	console.error('Missing parameters');
	process.exit(1);
}

const currency = new Currenzy(fromCurrency.toUpperCase());

const conversion = await currency.convert(fromAmount, targetCurrency.toUpperCase());

console.log(conversion, targetCurrency.toUpperCase());

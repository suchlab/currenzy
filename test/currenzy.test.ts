import Currenzy from '../src';

const amountInEUR: number = 5;
let amountInUSD: number = 0;

test('convert() -EUR conversion to USD', async () => {
	const currenzy = new Currenzy('EUR');

	amountInUSD = await currenzy.convert(amountInEUR, 'USD');

	expect(typeof amountInUSD).toBe('number');
});

test('convert() - USD conversion to EUR', async () => {
	const currenzy = new Currenzy('USD');

	const newAmountInEUR = await currenzy.convert(amountInUSD, 'EUR');

	expect(typeof newAmountInEUR).toBe('number');
	expect(newAmountInEUR).toBe(amountInEUR);
});

test('Invalid currency - Constructor', async () => {
	// @ts-ignore
	const currenzy = new Currenzy('invalid');

	await expect(currenzy.convert(5, 'EUR')).rejects.toThrow('Currency does not exist: invalid');
});

test('Invalid currency - convert()', async () => {
	const currenzy = new Currenzy('EUR');

	// @ts-ignore
	await expect(currenzy.convert(5, 'invalid')).rejects.toThrow('Currency does not exist: invalid');
});

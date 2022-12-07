const axios = require('axios');
const fs = require('fs');
const path = require('path');

const RATES_URL = process.env.RATES_URL || null;
const FILE = path.resolve(__dirname, '../data/rates.json');

module.exports = async function () {
	if (!RATES_URL) throw new Error('Missing RATES_URL');

	console.log('Getting updated rates...');

	let response;
	try {
		response = await axios({ url: RATES_URL, headers: { 'Accept-Encoding': 'gzip' }});
	} catch (e) { console.log(e) }

	const rates = response?.data?.rates;

	if (!rates) throw new Error('Could not get rates');

	console.log('Got updated rates!');

	fs.unlinkSync(FILE);

	console.log('Deleted old rates file');

	fs.writeFileSync(FILE, JSON.stringify(rates));

	console.log('Wrote new rates file!');

	process.exit();
}();

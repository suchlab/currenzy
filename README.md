# Currenzy - Exchange Rates
![CI](https://github.com/currenzy/currenzy/actions/workflows/ci.yml/badge.svg)

## Installation
```sh
npm install currenzy
```

## Usage
Initialize Currenzy with the base currency. If not provided, the base currency by default is EUR.

```js
import Currenzy from 'currenzy';

const currenzy = new Currenzy('EUR');
```

## Methods
### Conversion
To make a conversion, add the amount and the target currency:

```js
const amountInUSD = await currenzy.convert(5, 'USD');
```

### Refresh rates
Conversion rates are updated via GitHub Actions every 12 hours. The class instance downloads the latest rates from this repo, but saves the results in memory.
If your application lives more than 12 hours, you can re-fetch the latest rates using the `refreshRates` method:

```js
await currenzy.refreshRates();
```

### Template
Used the "package" template from [get-template](https://github.com/get-template/package-template)

```sh
npx get-template@latest package
````

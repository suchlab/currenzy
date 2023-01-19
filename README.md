# Currenzy - Exchange Rates
![CI](https://github.com/currenzy/currenzy/actions/workflows/ci.yml/badge.svg)

Free module to get the conversion rates for dozens of currencies. Conversion rates are updated via GitHub Actions every 12 hours.

Note: The module fetches the latest rates from a URL, not the local file (i.e. there is no need to update the package to get the newest rates).

## Installation
```sh
npm install currenzy
```

## Usage
Initialize Currenzy with the base currency. If not provided, the base currency by default is EUR. Currency uses the ISO 4217 standard.

```js
import Currenzy from 'currenzy';

const currenzy = new Currenzy('EUR');
```

## Methods
### Conversion
To make a conversion, add the amount and the target currency:

```js
const amountInUSD = await currenzy.convert(5, 'USD');
// 5.266205
```

### Refresh rates
The class instance downloads the latest rates from this repo, but saves the results in memory.

The `convert()` method automatically checks if the data is older than 6 hours. If so, it fetches again the data.

However, you can re-fetch the latest rates using the `refreshRates` method:

```js
await currenzy.refreshRates();
```

## Currencies
This is the list of supported currencies by Currenzy:

|     |     |     |     |     |     |     |     |     |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| AED | BRL | CZK | GYD | KHR | MMK | PGK | SOS | UZS |
| AFN | BSD | DJF | HKD | KMF | MNT | PHP | SRD | VEF |
| ALL | BTC | DKK | HNL | KPW | MOP | PKR | STD | VES |
| AMD | BTN | DOP | HRK | KRW | MRO | PLN | SVC | VND |
| ANG | BWP | DZD | HTG | KWD | MUR | PYG | SYP | VUV |
| AOA | BYN | EGP | HUF | KYD | MVR | QAR | SZL | WST |
| ARS | BYR | ERN | IDR | KZT | MWK | RON | THB | XAF |
| AUD | BZD | ETB | ILS | LAK | MXN | RSD | TJS | XAG |
| AWG | CAD | EUR | IMP | LBP | MYR | RUB | TMT | XAU |
| AZN | CDF | FJD | INR | LKR | MZN | RWF | TND | XCD |
| BAM | CHF | FKP | IQD | LRD | NAD | SAR | TOP | XDR |
| BBD | CLF | GBP | IRR | LSL | NGN | SBD | TRY | XOF |
| BDT | CLP | GEL | ISK | LTL | NIO | SCR | TTD | XPF |
| BGN | CNY | GGP | JEP | LVL | NOK | SDG | TWD | YER |
| BHD | COP | GHS | JMD | LYD | NPR | SEK | TZS | ZAR |
| BIF | CRC | GIP | JOD | MAD | NZD | SGD | UAH | ZMK |
| BMD | CUC | GMD | JPY | MDL | OMR | SHP | UGX | ZMW |
| BND | CUP | GNF | KES | MGA | PAB | SLE | USD | ZWL |
| BOB | CVE | GTQ | KGS | MKD | PEN | SLL | UYU |     |


----

### Template
Used the `package` template from [get-template](https://github.com/suchlab/package-template)

```sh
npx get-template@latest package
````

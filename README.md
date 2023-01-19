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

|     |     |     |     |     |     |
|-----|-----|-----|-----|-----|-----|
| AED | CHF | HKD | LSL | PKR | TTD |
| AFN | CLF | HNL | LTL | PLN | TWD |
| ALL | CLP | HRK | LVL | PYG | TZS |
| AMD | CNY | HTG | LYD | QAR | UAH |
| ANG | COP | HUF | MAD | RON | UGX |
| AOA | CRC | IDR | MDL | RSD | USD |
| ARS | CUC | ILS | MGA | RUB | UYU |
| AUD | CUP | IMP | MKD | RWF | UZS |
| AWG | CVE | INR | MMK | SAR | VEF |
| AZN | CZK | IQD | MNT | SBD | VES |
| BAM | DJF | IRR | MOP | SCR | VND |
| BBD | DKK | ISK | MRO | SDG | VUV |
| BDT | DOP | JEP | MUR | SEK | WST |
| BGN | DZD | JMD | MVR | SGD | XAF |
| BHD | EGP | JOD | MWK | SHP | XAG |
| BIF | ERN | JPY | MXN | SLE | XAU |
| BMD | ETB | KES | MYR | SLL | XCD |
| BND | EUR | KGS | MZN | SOS | XDR |
| BOB | FJD | KHR | NAD | SRD | XOF |
| BRL | FKP | KMF | NGN | STD | XPF |
| BSD | GBP | KPW | NIO | SVC | YER |
| BTC | GEL | KRW | NOK | SYP | ZAR |
| BTN | GGP | KWD | NPR | SZL | ZMK |
| BWP | GHS | KYD | NZD | THB | ZMW |
| BYN | GIP | KZT | OMR | TJS | ZWL |
| BYR | GMD | LAK | PAB | TMT |     |
| BZD | GNF | LBP | PEN | TND |     |
| CAD | GTQ | LKR | PGK | TOP |     |
| CDF | GYD | LRD | PHP | TRY |     |

----

### Template
Used the `package` template from [get-template](https://github.com/suchlab/package-template)

```sh
npx get-template@latest package
````

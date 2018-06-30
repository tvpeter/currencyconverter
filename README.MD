CURRENCY CONVERTER WEBAPP
---------------------------

CURRENCY CONVERTER WEBAPP is an offline-first progressive web app (PWA) that converts between any currencies using the CurrencyConverter Api (https://www.currencyconverterapi.com). The application uses the ServiceWorker and Browser Cache  API's to cache resources and IndexedDb api to store the currency conversion rates. 

The app works offline for currencies already used by the user while online.

DESIGN APPROACH:
- Attempt is made to fetch static resources from the cache
- If found, they are served, else attempts fetching from the network
- the cache updates every hour deleting the old cache and installing new version
- Static resources are fetched from the cache and served using the Serviceworker  before fetching from network;
- Currencies conversion rates are first attempted a fetch from the network and if connected, saved in the indexeddb (rate for both to be converted from currency and the to be converted to currency) and used for the conversion;
- If network fetch fails, the indexedDb is searched, if found the conversion will be done but the user is notified to connect to the network for an updated exchange rate.
- When the network fail and the requested currencies rates are not found in the database, a message is displayed to the user to connect to the network.
- There was no apparent need to clean the indexeddb because only 192 currencies are in the world and the db store only light items (key and value).

RESOURCES USED
- Service worker
- Cache Api
- IndexedDb 
- CurrencyConverter Api (https://www.currencyconverterapi.com)
- Twitter bootstrap for UI
- HTTP SERVER for testing during development
- idb.js (IndexedDb with Promises from Jake Archibald-https://github.com/jakearchibald/idb/tree/e6c31ba4f5a8766ab3762098b2f9029c2d8f95bc)


ALL THANKS TO ALCWITHGOOGLE3.0 (#7DaysofCodeChallenge) AND https://www.currencyconverterapi.com

  Visit the project demo here => https://tvpeter.github.io/currencyconverter/
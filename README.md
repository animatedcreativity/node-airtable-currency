# node-airtable-currency
Fill open exchange currency rates to Airtable spreadsheet.

Fetches latest currency rates from open-exchange-rates and syncs them to Airtable's table.

Open exchange rates: https://openexchangerates.org/<br/>
Airtable: https://airtable.com/

How to use:

var nodeAirtableCurrency = require("node-airtable-currency");

var config = new nodeAirtableCurrency.config();

config.exchange.base = "SEK"; // base currency, default is USD<br/>
config.exchange.appId = "<app_id>"; // Get App ID here: https://openexchangerates.org/<br/>
config.exchange.decimals = 8; // Number of decimals to use for currency, default is 8

config.airtable.apiKey = "<api_key>";  // Check airtable account settings to get this: https://airtable.com/<br/>
config.airtable.base = "<base_key>"; // Check API documentation to get this: https://airtable.com/api<br/>
config.airtable.table = "Currency"; // Airtable's table name, should have these 2 columns: Code, Rate<br/>
config.airtable.view = "Grid view"; // Airtable table's view

nodeAirtableCurrency.sync(config); // check console for output
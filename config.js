exports.config = function() {
  return {
    exchange: {
      base: "USD",
      appId: "<app_id>", // Get App ID here: https://openexchangerates.org/
      decimals: 8
    },
    airtable: {
      apiKey: "<api_key>", // Check airtable account settings to get this: https://airtable.com/
      base: "<base_key>", // Check API documentation to get this: https://airtable.com/api
      table: "Currency", // Should have these 2 columns: Code, Rate
      view: "Grid view" //view must have these 2 columns: Code, Rate (Decimal)
    }
  }
}
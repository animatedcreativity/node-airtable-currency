exports.fetch = function(config, base) {
  return new Promise(function(resolve, reject) {
    var allRecords = [];
    base(config.table).select({
        view: config.view
    }).eachPage(function page(records, fetchNextPage) {
        allRecords = allRecords.concat(records);
        fetchNextPage();
    }, function done(error) {
      if (error) {
        throw error;
        return false;
      }
      resolve(allRecords);
    });
  });
}
exports.update = function(config, base, id, rate) {
  return new Promise(function(resolve, reject) {
    base(config.table).update(id, {
      "Rate": rate
    }, function(error, record) {
        if (error) { throw error; return false; }
        resolve(record);
    });
  });
}
exports.create = function(config, base, code, rate) {
  return new Promise(function(resolve, reject) {
    base(config.table).create({
      "Code": code,
      "Rate": rate
    }, function(error, record) {
        if (error) { throw error; return; }
        resolve(record);
    });
  });
}
exports.exists = function(records, code) {
  for (var i=0; i<=records.length-1; i++) {
    var record = records[i];
    if (record.get("Code") === code) return true;
  }
  return false;
}
exports.sync = async function(config) {
  var currency = require("./exchange");
  var rates = await currency.rates(config.exchange);
  var airtable = require('airtable');
  var base = new airtable({apiKey: config.airtable.apiKey}).base(config.airtable.base);
  var records = await exports.fetch(config.airtable, base);
  for (var i=0; i<=records.length-1; i++) {
    var record = records[i];
    if (typeof rates[record.get("Code")] === "undefined") { //deletions
      // no deletions - implement if needed
      console.log("Skipping: " + record.get("Code"));
    } else {
      if (rates[record.get("Code")] != record.get("Rate")) { //updates
        await exports.update(config.airtable, base, record.id, rates[record.get("Code")]);
        console.log("Updated: " + record.get("Code"));
      } else {
        console.log("No change: " + record.get("Code"));
      }
    }
  }
  for (var rate in rates) {
    if (exports.exists(records, rate) === true) { //updates
      // already updated above
    } else { //inserts
      await exports.create(config.airtable, base, rate, rates[rate]);
      console.log("Added: " + rate);
    }
  }
}
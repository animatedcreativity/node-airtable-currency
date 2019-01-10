exports.number = function(decimals) {
  if (!decimals) return 1;
  var num = 10;
  for (var i=0; i<=decimals-2; i++) num *= 10;
  return num;
}
exports.convert = function(rates, fromBase, decimals) {
  var rate = 1;
  var newRates = {};
  for (var base in rates) {
    if (base === fromBase) rate = rates[base];
  }
  for (var base in rates) {
    newRates[base] = Math.round(rates[base] / rate * exports.number(decimals)) / exports.number(decimals);
  }
  return newRates;
}
exports.rates = function(config) {
  return new Promise(function(resolve, reject) {
    var oxr = require('open-exchange-rates');
    oxr.set({app_id: config.appId});
    oxr.latest(function() {
      resolve(exports.convert(oxr.rates, config.base, config.decimals));
    });
  });
}
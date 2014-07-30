
var serialNumber = require('serial-number');
var serverStats = require('./lib/serverstats');
var systemStats = require('./lib/systemstats');

serialNumber(function (err, value) {
  console.log('Serial Number', value);
});

function handler(err) {
  if (err) return console.log('Error', err);

  // console.log('Data', data);
}

// serverStats(handler);

setInterval(function () {
  systemStats(handler);
}, 10000);

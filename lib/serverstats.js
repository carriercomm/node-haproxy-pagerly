
var haproxystat = require('../node_modules/haproxy-stat/lib/haproxystat');
var config = require('../config');
var request = require('superagent');
var debug = require('debug')('hapagerly::serverstats');

module.exports = function (callback) {
  var hastat = haproxystat(config);

  var endpoint =
    'http://api:a094fae1-4cb7-426b-b85a-17492dcc152c@api.pager.ly:9009' +
    '/1.0/metric/13/values';

  hastat.showInfo(function (err, data) {
    if (err) return callback(err);

    request
      .post(endpoint)
      .set('Accept', 'application/json')
      .send({
        value: data[0].scur
      })
      .end(function (err) {
        if (err) return callback(err);

        debug('stat sent');
        return callback(undefined, data);
      });
  });
};


var haproxystat = require('../node_modules/haproxy-stat/lib/haproxystat');
var request = require('superagent');
var config = require('../config');
var debug = require('debug')('hapagerly::systemstats');

module.exports = function (callback) {
  var hastat = haproxystat(config);

  var endpoint =
    'http://api:a094fae1-4cb7-426b-b85a-17492dcc152c@api.pager.ly:9009' +
    '/1.0/metric/13/values';

  hastat.showInfo(function (err, data) {
    if (err) return callback(err);

    var postData = {
      value: parseInt(data.current_conns)
    };
    debug('PostData', postData);

    request
      .post(endpoint)
      .send(postData)
      .end(function (res) {
        if (res.error) {
          debug('Error sending stat:', res);
          return callback(new Error('Failed to send stat'));
        }

        debug('stat sent');
        return callback(undefined, data);
      });
  });
};

var fs = require('fs'),
  _ = require('lodash');

module.exports = function (options) {
  var config = require(__dirname + '/default');
  return _.extend(config, require(__dirname + '/' + (options.environment || 'dev')));
}

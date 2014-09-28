var Checks = require('../models/checks');

module.exports.get = function (request, reply) {
  Checks.find().lean().exec(function (err, checks) {
    reply(checks);
  });
}

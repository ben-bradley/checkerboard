var Hapi = require('hapi'),
  _ = require('lodash'),
  Checks = require('../models/checks');

// readAll provides the list of checks for the active account
module.exports.readAll = function (request, reply) {
  var account = request.auth.credentials;
  console.log(account);
  Checks.find({
    account_id: account._id
  }, function (err, checks) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(checks);
  });
}

// create will create new checks for the active account (POST)
module.exports.create = function (request, reply) {
  var account = request.pre.account;
  if (!account)
    return reply(Hapi.error.badRequest('Account not found'));
  else if (account.checks.length >= account.check_limit)
    return reply(Hapi.error.badRequest('Check limit reached.'));
  var check = new Checks(_.omit(request.payload, '_id'));
  check.save(function (err) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(check);
  });
}

// read will return the details for a specific check (GET)
module.exports.read = function (request, reply) {
  var _id = request.params.id;
  Checks.findById(_id, function (err, check) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!check)
      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
    reply(check);
  });
}

// update will update a specific check (PUT)
module.exports.update = function (request, reply) {
  var payload = request.payload,
    account = payload.account,
    _id = request.params.id;
  Checks.findById(_id, function (err, check) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    else if (!check)
      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
    else if (check.account !== account)
      return reply(Hapi.error.badRequest('invalid account ' + account));
    _.assign(check, _.omit(payload, '_id'));
    check.validate(function (err) {
      if (err)
        return reply(Hapi.error.badRequest(err));
      check.save(function (err) {
        reply(check);
      });
    });
  });
}

module.exports.delete = function (request, reply) {
  var _id = request.params.id;
  Checks.findById(_id, function (err, check) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    else if (!check)
      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
    check.remove(function (err) {
      if (err)
        return reply(Hapi.error.badRequets(err));
      reply({
        deleted: _id
      });
    });
  });
}

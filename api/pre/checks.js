var Hapi = require('hapi'),
  _ = require('lodash'),
  Checks = require('../models/checks');

// readAll provides the list of checks for the active account
module.exports.readAll = function (request, reply) {
  var account = request.auth.credentials;
  Checks.find({
    account_id: account._id
  }, function (err, checks) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(checks);
  });
}

// read will return the details for a specific check (GET)
module.exports.read = function (request, reply) {
  var _id = request.params.id,
    account = request.auth.credentials;
  Checks.findOne({
    _id: _id,
    account_id: account._id
  }, function (err, check) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!check)
      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
    reply(check);
  });
}

// create will create new checks for the active account (POST)
module.exports.create = function (request, reply) {
  var account = request.auth.credentials;
  if (account.checks_limit >= 0 && account.checks.length >= account.check_limit)
    return reply(Hapi.error.badRequest('Check limit reached'));
  var check = new Checks(_.omit(request.payload, '_id'));
  check.account_id = account._id;
  check.save(function (err) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(check);
  });
}

// update will update a specific check (PUT)
module.exports.update = function (request, reply) {
  var payload = request.payload,
    account = request.auth.credentials,
    _id = request.params.id;
  Checks.findOne({
    _id: _id,
    account_id: account._id
  }, function (err, check) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    else if (!check)
      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
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

// delete a specific check (DELETE)
module.exports.delete = function (request, reply) {
  var _id = request.params.id,
    account = request.auth.credentials;
  Checks.findOne({
    _id: _id,
    account_id: account._id
  }, function (err, check) {
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

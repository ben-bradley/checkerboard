var Hapi = require('hapi'),
  _ = require('lodash'),
  Accounts = require('../models/accounts');

module.exports.readAll = function (request, reply) {
  var _id = request.session.account;
  Accounts.find({}, function (err, accounts) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!accounts)
      return reply(Hapi.error.badRequest('no acounts found'));
    reply(accounts);
  });
}

module.exports.read = function (request, reply) {
  var _id = request.params.id;
  Accounts.findById(_id, function (err, account) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!account)
      return reply(Hapi.error.badRequest('account ' + _id + ' not found'));
    reply(account);
  });
}

module.exports.create = function (request, reply) {
  var account = new Accounts(_.omit(request.payload, '_id'));
  account.save(function (err) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(account);
  });
}

//module.exports.update = function (request, reply) {
//  var payload = request.payload,
//    _id = request.params.id;
//  Checks.findById(_id, function (err, check) {
//    if (err)
//      return reply(Hapi.error.badRequest(err));
//    else if (!check)
//      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
//    _.assign(check, _.omit(payload, '_id'));
//    check.validate(function (err) {
//      if (err)
//        return reply(Hapi.error.badRequest(err));
//      check.save(function (err) {
//        reply(check);
//      });
//    });
//  });
//}
//
//module.exports.delete = function (request, reply) {
//  var _id = request.params.id;
//  Checks.findById(_id, function (err, check) {
//    if (err)
//      return reply(Hapi.error.badRequest(err));
//    else if (!check)
//      return reply(Hapi.error.badRequest('check ' + _id + ' not found'));
//    check.remove(function (err) {
//      if (err)
//        return reply(Hapi.error.badRequets(err));
//      reply({
//        deleted: _id
//      });
//    });
//  });
//}

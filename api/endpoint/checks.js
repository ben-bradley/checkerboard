var Hapi = require('hapi'),
  Accounts = require('../pre/accounts'),
  Checks = require('../pre/checks');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/checks',
    config: {
      pre: [{
        method: Accounts.read,
        assign: 'account'
      }, {
        method: Checks.readAll,
        assign: 'checks'
      }],
      handler: function (request, reply) {
        reply(request.pre.checks);
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/checks',
    config: {
      pre: [{
        method: Accounts.read,
        assign: 'account'
      }, {
        method: Checks.create,
        assign: 'check'
      }],
      handler: function (request, reply) {
        reply(request.pre.check);
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/checks/{id}',
    config: {
      pre: [{
        method: Checks.read,
        assign: 'checks'
      }],
      handler: function (request, reply) {
        reply(request.pre.checks);
      }
    }
  });

  plugin.route({
    method: 'PUT',
    path: '/checks/{id}',
    config: {
      pre: [{
        method: Checks.update,
        assign: 'check'
      }],
      handler: function (request, reply) {
        reply(request.pre.check);
      }
    }
  });

  plugin.route({
    method: 'DELETE',
    path: '/checks/{id}',
    config: {
      pre: [{
        method: Checks.delete,
        assign: 'check'
      }],
      handler: function (request, reply) {
        reply(request.pre.check);
      }
    }
  });

  next();

}

exports.register.attributes = {
  name: 'checks',
  version: '0.0.0'
}

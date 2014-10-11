var Hapi = require('hapi'),
  Accounts = require('../pre/accounts'),
  Checks = require('../pre/checks');

exports.register = function (plugin, options, next) {

  // get the checks for an account
  // request sent from UI
  plugin.route({
    method: 'GET',
    path: '/checks',
    config: {
      auth: 'account-auth',
      pre: [{
        method: Checks.readAll,
        assign: 'checks'
      }],
      handler: function (request, reply) {
        reply(request.pre.checks);
      }
    }
  });

  // add a new check to an account
  // request sent from UI
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

  // get the details of a specific check
  // request sent from UI
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

  // update a specific check
  // request sent from the check app/script, must contain the secret
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

  // delete a check
  // request sent from UI
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

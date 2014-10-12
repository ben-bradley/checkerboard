var Hapi = require('hapi'),
  Accounts = require('../pre/accounts');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/accounts',
    config: {
      auth: 'account-auth',
      pre: [{
        method: Accounts.isAdmin
      }, {
        method: Accounts.readAll,
        assign: 'accounts'
      }],
      handler: function (request, reply) {
        reply(request.pre.accounts);
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/accounts',
    config: {
      auth: 'account-auth',
      pre: [{
        method: Accounts.isAdmin
      }, {
        method: Accounts.create,
        assign: 'account'
      }],
      handler: function (request, reply) {
        reply(request.pre.account);
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/accounts/{id}',
    config: {
      auth: 'account-auth',
      pre: [{
        method: Accounts.isAdmin
      }, {
        method: Accounts.read,
        assign: 'account'
      }],
      handler: function (request, reply) {
        reply(request.pre.account);
      }
    }
  });

  //  plugin.route({
  //    method: 'PUT',
  //    path: '/accounts/{id}',
  //    config: {
  //      pre: [{
  //        method: Accounts.update,
  //        assign: 'account'
  //      }],
  //      handler: function (request, reply) {
  //        reply(request.pre.account);
  //      }
  //    }
  //  });
  //
  //  plugin.route({
  //    method: 'DELETE',
  //    path: '/accounts/{id}',
  //    config: {
  //      pre: [{
  //        method: Accounts.delete,
  //        assign: 'account'
  //      }],
  //      handler: function (request, reply) {
  //        reply(request.pre.account);
  //      }
  //    }
  //  });

  next();

}

exports.register.attributes = {
  name: 'accounts',
  version: '0.0.0'
}

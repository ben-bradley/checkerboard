var Hapi = require('hapi'),
  Handlebars = require('handlebars'),
  Users = require('../pre/users'),
  Accounts = require('../pre/accounts');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/auth/login',
    config: {
      handler: function (request, reply) {
        var redirectUri = request.info.referrer || '/';
        if (request.auth.isAuthenticated)
          return reply.redirect(redirectUri);
        request.session.redirectUri = redirectUri;
        reply.view('login', {
          message: 'Login'
        });
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/auth/login',
    config: {
      pre: [{
        method: Users.validate,
        assign: 'user'
      }],
      handler: function (request, reply) {
        console.log(request.session);
        reply.redirect(request.session.redirectUri);
      }
    }
  });

  //  plugin.route({
  //    method: 'GET',
  //    path: '/accounts/{id}',
  //    config: {
  //      pre: [{
  //        method: Accounts.read,
  //        assign: 'account'
  //      }],
  //      handler: function (request, reply) {
  //        reply(request.pre.account);
  //      }
  //    }
  //  });

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
  name: 'auth',
  version: '0.0.0'
}

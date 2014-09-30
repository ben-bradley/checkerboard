var Hapi = require('hapi'),
  Users = require('../pre/users');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/users',
    config: {
      auth: 'simple',
      pre: [{
        method: Users.readAll,
        assign: 'users'
      }],
      handler: function (request, reply) {
        reply(request.pre.users);
      }
    }
  });

  plugin.route({
    method: 'POST',
    path: '/users',
    config: {
      pre: [{
        method: Users.create,
        assign: 'user'
      }],
      handler: function (request, reply) {
        reply(request.pre.user);
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/users/{id}',
    config: {
      pre: [{
        method: Users.read,
        assign: 'user'
      }],
      handler: function (request, reply) {
        reply(request.pre.user);
      }
    }
  });

  //  plugin.route({
  //    method: 'PUT',
  //    path: '/users/{id}',
  //    config: {
  //      pre: [{
  //        method: Users.update,
  //        assign: 'user'
  //      }],
  //      handler: function (request, reply) {
  //        reply(request.pre.user);
  //      }
  //    }
  //  });
  //
  //  plugin.route({
  //    method: 'DELETE',
  //    path: '/users/{id}',
  //    config: {
  //      pre: [{
  //        method: Users.delete,
  //        assign: 'user'
  //      }],
  //      handler: function (request, reply) {
  //        reply(request.pre.user);
  //      }
  //    }
  //  });

  next();

}

exports.register.attributes = {
  name: 'users',
  version: '0.0.0'
}

var Hapi = require('hapi'),
  _ = require('lodash'),
  Bcrypt = require('bcrypt'),
  Users = require('../models/users');

module.exports.validate = function (username, password, callback) {
  Users.findOne({
    username: username
  }, function (err, user) {
    if (!user)
      return callback(null, false);
    Bcrypt.compare(password, user.password, function (err, isValid) {
      callback(err, isValid, _.omit(user, 'password'));
    });
  });
}

module.exports.readAll = function (request, reply) {
  console.log(request);
  var _id = request.session.account;
  Users.find({}, {
    password: false
  }, function (err, users) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!users)
      return reply(Hapi.error.badRequest('no users found'));
    reply(users);
  });
}

module.exports.read = function (request, reply) {
  var _id = request.params.id;
  Users.findById(_id, {
    password: false
  }, function (err, user) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    if (!user)
      return reply(Hapi.error.badRequest('user ' + _id + ' not found'));
    reply(user);
  });
}

module.exports.create = function (request, reply) {
  var user = new Users(_.omit(request.payload, '_id'));
  user.save(function (err) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    reply(_.omit(user, 'password'));
  });
}

module.exports.update = function (request, reply) {
  var payload = request.payload,
    _id = request.params.id;
  Users.findById(_id, {
    password: false
  }, function (err, user) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    else if (!user)
      return reply(Hapi.error.badRequest('user ' + _id + ' not found'));
    _.assign(user, _.omit(payload, '_id'));
    user.validate(function (err) {
      if (err)
        return reply(Hapi.error.badRequest(err));
      user.save(function (err) {
        reply(user);
      });
    });
  });
}

module.exports.delete = function (request, reply) {
  var _id = request.params.id;
  Users.findById(_id, function (err, user) {
    if (err)
      return reply(Hapi.error.badRequest(err));
    else if (!user)
      return reply(Hapi.error.badRequest('user ' + _id + ' not found'));
    user.remove(function (err) {
      if (err)
        return reply(Hapi.error.badRequets(err));
      reply({
        deleted: _id
      });
    });
  });
}

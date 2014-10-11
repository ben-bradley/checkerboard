var Hapi = require('hapi'),
  _ = require('lodash'),
  Accounts = require('../models/accounts');;

exports.register = function (plugin, options, next) {

  plugin.auth.scheme('account-auth-header', function (api, options) {

    if (!options.validate)
      throw new Error('account-auth expects validate function');

    var scheme = {
      authenticate: function (request, reply) {

        var account_id = request.headers.account_id,
          account_secret = request.headers.account_secret;

        if (!account_id || !account_secret)
          return reply(Hapi.error.unauthorized('Missing required header'));

        Accounts.findOne({
          _id: account_id,
          secret: account_secret
        }, function (err, account) {
          if (err)
            return reply(Hapi.error.badRequest(err));
          else if (!account)
            return reply(Hapi.error.unauthorized('account not found'));
          else
            return reply(null, {
              credentials: account
            });
        });

      }
    };

    return scheme;

  });

  next();

};

exports.register.attributes = {
  name: 'account-auth',
  version: '0.0.1'
};

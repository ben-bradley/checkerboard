var Checks = require('../pre/checks');

exports.register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/checks',
    config: {
      pre: [
        {
          method: Checks.get,
          assign: 'checks'
        }
      ],
      handler: getChecksHandler
    }
  });

  plugin.route({
    method: 'POST',
    path: '/checks',
    config: {
      handler: postChecksHandler
    }
  });

  next();

}

exports.register.attributes = {
  name: 'checks',
  version: '0.0.0'
}

function getChecksHandler(request, reply) {
  reply(request.pre.checks);
}

function postChecksHandler(request, reply) {
  reply({
    ok: true
  });
}

var ENVIRONMENT = process.env.NODE_ENV || 'dev';

var Hapi = require('hapi'),
  mongoose = require('mongoose'),
  colors = require('colors'),
  config = require('./config')(ENVIRONMENT);

var api = new Hapi.Server('localhost', config.port, {
  cors: true
});

mongoose.connect(config.db);

api.info.environment = ENVIRONMENT;

api.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    var routes = api.table().map(function (route) {
      return {
        path: route.path,
        method: route.method,
        params: route.params
      }
    });
    reply({
      routes: routes,
      info: api.info
    });
  }
});

api.pack.register({
  plugin: require('./endpoint/checks'),
  options: {}
}, function (err) {
  if (err)
    console.log(err.message.red);
});

api.pack.register({
  plugin: require('./endpoint/accounts'),
  options: {}
}, function (err) {
  if (err)
    console.log(err.message.red);
});

api.start(function () {
  console.log('\n// Listening at: '.green + api.info.uri.magenta);
});

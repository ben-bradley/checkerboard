var ENVIRONMENT = process.env.NODE_ENV || 'dev';

var Hapi = require('hapi'),
  mongoose = require('mongoose'),
  colors = require('colors'),
  glob = require('glob'),
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

glob.sync(__dirname + '/endpoint/*.js').forEach(function (file) {
  console.log('// Loading endpoint: '.green + file.yellow);
  api.pack.register({
    plugin: require(file),
    options: {}
  }, function (err) {
    if (err)
      console.log(err.message.red);
  });
});

api.start(function () {
  console.log('\n// Listening at: '.green + api.info.uri.magenta);
});

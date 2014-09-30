var ENVIRONMENT = process.env.NODE_ENV || 'dev';

var Hapi = require('hapi'),
  mongoose = require('mongoose'),
  colors = require('colors'),
  uuid = require('uuid'),
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

api.views({
  engines: {
    html: require('handlebars')
  },
  path: __dirname + '/templates'
});

api.pack.register({
  plugin: require('yar'),
  options: {
    name: 'checkerboard',
    maxCookieSize: 1024, // 0 == server-side storage
    cache: { // https://github.com/hapijs/hapi/blob/master/docs/Reference.md#plugincacheoptions
      expiresIn: 1000 * 60 * 60 * 24
    },
    cookieOptions: {
      password: uuid.v4(),
      path: '/',
      isSecure: false
    }
  }
}, function (err) {
  if (err)
    console.log(err.message.red);
});

api.pack.register(require('hapi-auth-cookie'), function (err) {
  if (err)
    console.log(err.message.red);
  var secret = uuid.v4();
  api.auth.strategy('session', 'cookie', {
    password: secret,
    cookie: 'checkerboard-auth',
    redirectTo: '/auth/login',
    isSecure: false
  });
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

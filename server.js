var express = require('express');
var app = express();
var http = require('http').Server(app);

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

// Start app
http.listen(config.port);
console.log('Application started and listening to ' + config.port + '...');
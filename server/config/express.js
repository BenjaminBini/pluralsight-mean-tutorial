var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var stylus = require('stylus');

module.exports = function(app, config) {
	// Set stylus middleware
	app.use(stylus.middleware(
		{
			src: config.rootPath + '/public',
			compile: function (str, path) {
				return stylus(str).set('filename', path);
			}
		})
	);

	// Body parser
	app.use(bodyParser());
	// Set static middleware for static assets
	app.use(express.static(config.rootPath + '/public'));

	// Set views dir and engine
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');

	// Logger
	app.use(logger('dev'));
};


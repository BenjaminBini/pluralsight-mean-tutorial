var express = require('express');
var app = express();
var http = require('http').Server(app);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

passport.use(new LocalStrategy(
	function (userName, password, done) {
		User.findOne({userName:userName}).exec(function (err, user) {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
));


passport.serializeUser(function (user, done) {
	if (user) {
		return done(null, user._id);
	}
});

passport.deserializeUser(function (id, done) {
	User.findOne({_id:id}).exec(function () {
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		} 
	});
})

require('./server/config/routes')(app);

// Start app
http.listen(config.port);
console.log('Application started and listening to ' + config.port + '...');
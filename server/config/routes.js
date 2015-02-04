var auth = require('./auth');
var mongoose = require('mongoose');
var users = require('../controllers/users');

module.exports = function(app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUser);
	app.post('/api/users', users.createUser);

	// Render partials
	app.get('/partials/*', function (req, res) {
		res.render('../../public/app/' + req.params[0]);
	});
	
	// Auth routes
	app.post('/login', auth.authenticate);
	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	// Catch all requests
	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
};
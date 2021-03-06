/**
 * Routes configuration
 */

var auth = require('./auth');
var mongoose = require('mongoose');
var users = require('../controllers/users');
var courses = require('../controllers/courses');

module.exports = function(app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);
	app.get('/api/users/:id', auth.requiresRole('admin'), users.getUserById);

	app.get('/api/courses', courses.getCourses);
	app.get('/api/courses/:id', courses.getCourseById);

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

	// Return 404 for undefined api queries
	app.all('/api/*', function(req, res) {
		res.send(404);
	});

	// Same for Jade files
	app.all('*.jade', function(req, res) {
		res.send(404);
	})

	// Catch all requests
	app.get('*', function (req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
};
var auth = require('./auth');

module.exports = function(app) {
	// Render partials
	app.get('/partials/*', function (req, res) {
		res.render('../../public/app/' + req.params[0]);
	});
	
	// Login route
	app.post('/login', auth.authenticate);

	// Catch all requests
	app.get('*', function (req, res) {
		res.render('index');
	});
};
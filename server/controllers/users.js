/**
 * Users controller
 */

var encrypt = require('../utils/encryption');
var User = require('mongoose').model('User');

/**
 * Return array of all users
 * @param   req Request
 * @param   res Response
 * @return      Array of all users
 */
exports.getUsers = function(req, res) {
	User.find({}).exec(function(err, collection) {
		res.send(collection);
		return collection;
	});
};

/**
 * Return the user with the given id
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getUserById = function (req, res) {
	console.log("TESSST");
	User.findOne({_id: req.params.id}).exec(function (err, user) {
		res.send(user);
	});
};

/**
 * Create a new user
 * @param  {[type]}   req  Request
 * @param  {[type]}   res  Response
 * @param  {Function} next Next
 * @return {[type]}        Created user
 */
exports.createUser = function(req, res, next) {
	// Get the user data from the request
	var userData = req.body;
	// Encrypt password
	userData.salt = encrypt.createSalt();
	userData.hashedPassword = encrypt.hashPassword(userData.salt, userData.password);

	// Create user
	User.create(userData, function (err, user) {
		if (err) {
			// If the error is E11000, the reason is a duplicate username
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('This username already exists');
			}
			// Return 400 code with the error
			res.status(400);
			return res.send({reason: err.toString()});
		}
		// If no error, login the user
		req.logIn(user, function (err) {
			// If login fail, continue the middleware chain
			if (err) {
				return next(err);
			}

			// Send and return the user
			res.send(user);
			return user;
		});
	});
};

/**
 * Update a user
 * @param  {[type]}   req  Request
 * @param  {[type]}   res  Response
 * @return {[type]}        Updated user
 */
exports.updateUser = function(req, res) {
	// Get the user data from the request
	var userUpdates = req.body;

	// Check if the user is authorized (admin or current user)
	if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
		res.status(403);
		return res.end();
	}

	// Get the user we have to modify
	User.findOne({_id: userUpdates._id}).exec(function(err, user) {
		user.firstName = userUpdates.firstName;
		user.lastName = userUpdates.lastName;
		user.username = userUpdates.username;
		// If needed, generate new hashed password
		if (userUpdates.password && userUpdates.password.length > 0) {
			user.salt = encrypt.createSalt();
			user.hashedPassword = encrypt.hashPassword(user.salt, userUpdates.password);
		}
		// If the modified user is the logged in user, let's reset it
		if (req.user._id == userUpdates._id) {
			req.user = user;
		}
		// Save the user
		user.save(function(err) {
			if (err) {
				// If an error occure, return error 400 with the error
				res.status(400);
				return res.send({
					reason: err.toString()
				});
			}
			// Send and return the user
			res.send(user);
			return user;
		});
	});
};
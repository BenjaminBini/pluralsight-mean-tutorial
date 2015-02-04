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

	// TODO : Run only if it is the current user (not the admin)
	// Change the infos of the current user
	req.user.firstName = userUpdates.firstName;
	req.user.lastName = userUpdates.lastName;
	req.user.username = userUpdates.username;
	// If needed, generate new hashed password
	if (userUpdates.password && userUpdates.password.length > 0) {
		req.user.salt = encrypt.createSalt();
		req.user.hashedPassword = encrypt.hashPassword(req.user.salt, userUpdates.password);
	}

	// Save the user
	req.user.save(function(err) {
		if (err) {
			// If an error occure, return error 400 with the error
			res.status(400);
			return res.send({
				reason: err.toString()
			});
		}
		// Send and return the user
		res.send(req.user);
		return req.user;
	});
};
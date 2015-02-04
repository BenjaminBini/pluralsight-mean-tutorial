var encrypt = require('../utils/encryption');
var User = require('mongoose').model('User');

exports.getUser = function(req, res) {
	User.find({}).exec(function(err, collection) {
		res.send(collection);
	});
}


exports.createUser = function(req, res, next) {
	var userData = req.body;
	userData.salt = encrypt.createSalt();
	userData.hashedPassword = encrypt.hashPassword(userData.salt, userData.password);
	User.create(userData, function (err, user) {
		console.log(userData);
		console.log(err);
		if (err) {
			if (err.toString().indexOf('E11000') > -1) {
				err = new Error('This username already exists');
			}
			res.status(400);
			return res.send({reason: err.toString()});
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			res.send(user);
		});
	});
}
var mongoose = require('mongoose');
var encrypt = require('../utils/encryption');

var userSchema = mongoose.Schema({
	firstName: {
		type:String, 
		required:'{PATH} is required'
	},
	lastName: {
		type:String, 
		required:'{PATH} is required'
	},
	username: {
		type: String,
		required: '{PATH} is required',
		unique: true,
		lowercase: true
	},
	salt: {type:String, required:'{PATH} is required'},
	hashedPassword: {
		type: String, 
		required:'{PATH} is required'
	},
	roles: [String]
});

userSchema.methods = {
	authenticate: function (passwordToMatch) {
		return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
	}
}
var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function() {
	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPassword(salt, 'joe');
			User.create({firstName: 'Joe', lastName: 'Doe', username: 'joe', salt: salt, hashedPassword: hash, roles: ["admin"] });
			User.create({firstName: 'Joe', lastName: 'Doe', username: 'joe', salt: salt, hashedPassword: hash, roles: ["admin"] });
			salt = encrypt.createSalt();
			hash = encrypt.hashPassword(salt, 'ben');
			User.create({firstName: 'Benjamin', lastName: 'Bini', username: 'ben', salt: salt, hashedPassword: hash, roles: []});
			salt = encrypt.createSalt();
			hash = encrypt.hashPassword(salt, 'leo');
			User.create({firstName: 'Léonie', lastName: 'Gros', username: 'leo', salt: salt, hashedPassword: hash});
		}
	});
}

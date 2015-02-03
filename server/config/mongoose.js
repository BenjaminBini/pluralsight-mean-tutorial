var mongoose = require('mongoose');
var crypto = require('crypto');

module.exports = function(config) {
	// Mongodb connection
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashedPassword: String,
		roles: [String]
	});

	userSchema.methods = {
		authenticate: function (passwordToMatch) {
			return hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
		}
	}
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPassword(salt, 'joe');
			User.create({firstName: 'Joe', lastName: 'Doe', username: 'joe', salt: salt, hashedPassword: hash, roles: ["admin"] });
			salt = createSalt();
			hash = hashPassword(salt, 'ben');
			User.create({firstName: 'Benjamin', lastName: 'Bini', username: 'ben', salt: salt, hashedPassword: hash, roles: []});
			salt = createSalt();
			hash = hashPassword(salt, 'leo');
			User.create({firstName: 'Léonie', lastName: 'Gros', username: 'leo', salt: salt, hashedPassword: hash});
		}
	});

}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}
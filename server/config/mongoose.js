var mongoose = require('mongoose');

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
		userName: String
	});
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			User.create({firstName: 'Joe', lastName:'Doe', userName:'JoeDoe'});
			User.create({firstName: 'Benjamin', lastName:'Bini', userName:'BenjaminBini'});
			User.create({firstName: 'Léonie', lastName:'Gros', userName:'LeonieGros'});
		}
	});

}
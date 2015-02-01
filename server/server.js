var express = require('express');
var app = express();
var http = require('http').Server(app);
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Logger
app.use(logger('dev'));

// Body parser
app.use(bodyParser());

// Stylus compile function
function compile(str, path) {
	return stylus(str).set('filename', path);
}

// Set views dir and engine
app.set('views', __dirname + '/../server/views');
app.set('view engine', 'jade');

// Set stylus middleware
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	})
);

// Set static middleware
app.use(express.static(__dirname + '/../public'));

// Render partials
app.get('/partials/:partialPath', function (req, res) {
	res.render('partials/' + req.params.partialPath);
});

// Mongodb connection
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
	console.log('db opened');
});

var messageSchema = mongoose.Schema({
	message: String
});

var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageObject) {
	mongoMessage = messageObject.message;
});

// Catch all requests
app.get('*', function (req, res) {
	res.render('index', {
		mongoMessage: mongoMessage
	});
});

// Start app
var port = 3030;
http.listen(port);
console.log('Application started and listening to ' + port + '...');
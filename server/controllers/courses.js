/**
 * Courses controller
 */

var encrypt = require('../utils/encryption');
var Course = require('mongoose').model('Course');

/**
 * Return array of all courses
 * @param   req Request
 * @param   res Response
 * @return      Array of all courses
 */
exports.getCourses = function(req, res) {
	Course.find({}).exec(function(err, collection) {
		res.send(collection);
		return collection;
	});
};

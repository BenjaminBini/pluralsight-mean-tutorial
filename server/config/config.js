var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: 3030
    },
    prodution: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: 3030
    }
};
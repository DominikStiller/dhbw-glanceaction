var tingodb = require('tingodb')();
var path = require('path');

var db = new tingodb.Db(path.join(__dirname, '/database'), {});

exports.db = db;
const tingodb = require('tingodb')();
const path = require('path');

// Initializing the database
const db = new tingodb.Db(path.join(__dirname, '/database'), {});

exports.db = db;

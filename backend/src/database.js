const tingodb = require('tingodb')();
const path = require('path');

const db = new tingodb.Db(path.join(__dirname, '/database'), {});

exports.db = db;

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const http = require('http');
const util = require('util');

const app = express();

app.use(bodyParser.json());

app.use(expressValidator());

app.use(cookieParser());

// Routes used for the different services
app.use('/api', require('./routes/accountRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/transactionRoutes'));

// Fallback for unsupported requests
app.use(function (req, res, next) {
    util.log(util.format('ERROR: Unsupported request: URL=%s, Method=%s', req.url, req.method));
    next();
});

let server = http.createServer(app);
server.listen(4000, function () {
    let port = server.address().port;
    util.log(util.format('Web Server listening at http://localhost:%s', port));
});

module.exports = app;
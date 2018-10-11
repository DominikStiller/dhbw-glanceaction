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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
  next();
});

// Routes used for the different services
app.use('/api', require('./routes/accountRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/transactionRoutes'));

// Fallback for unsupported requests
app.use((req, res, next) => {
  util.log(util.format('ERROR: Unsupported request: URL=%s, Method=%s', req.url, req.method));
  next();
});

const server = http.createServer(app);
server.listen(4000, () => {
  const { port } = server.address();
  util.log(util.format('Web Server listening at http://localhost:%s', port));
});

module.exports = app;

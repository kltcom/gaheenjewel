/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var auth = require('http-auth');

// Authenticate access
var basic = auth.basic({
	realm: 'Gaheen Jewel Area.'
}, function (username, password, callback) {
	callback(username === 'gaheen' && password === 'gaheen');
});

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate database with sample data
if (config.seedDB) require('./config/seed');

// Setup server
var app = express();
app.use(auth.connect(basic));
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

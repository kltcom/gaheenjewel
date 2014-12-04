/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var userController = require('./api/verificationToken/verificationToken.controller');

module.exports = function (app) {
	// Routes
	app.use('/api/drugs', require('./api/drug'));
	app.use('/api/medicalconditions', require('./api/medicalcondition'));
	app.use('/api/things', require('./api/thing'));
	app.use('/api/users', require('./api/user'));
	app.use('/auth', require('./auth'));

	// Undefined assets or api routes that should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

	app.get('/verifyUser/:token', function (req, res, next) {
		console.log('here in verify user');
		var token = req.params.token;
		userController.verifyUser(token, res,  function(err) {
			if (err) return res.redirect("verification-failure");
			res.redirect("/verify");
		});
	});
	// Other routes that should redirect to index.html
	app.route('/*').get(function (req, res) {
		res.sendfile(app.get('appPath') + '/index.html');
	});

};

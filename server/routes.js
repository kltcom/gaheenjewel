/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var controller = require('./api/verificationtoken/verificationtoken.controller');
var upload = require('./upload/upload.controller');

module.exports = function (app) {
	// Routes
	app.use('/api/drugs', require('./api/drug'));
	app.use('/api/medicalconditions', require('./api/medicalcondition'));
	app.use('/api/strains', require('./api/strain'));
	app.use('/api/things', require('./api/thing'));
	app.use('/api/users', require('./api/user'));
	app.use('/auth', require('./auth'));
	app.use('/data', require('./data'));

	// Undefined assets or api routes that should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets|upload|data)/*').get(errors[404]);

	app.get('/verifyuser/:token', function (req, res, next) {
		console.log('here in verify user');
		var token = req.params.token;
		controller.verifyUser(token, res, function (err) {
			if (err) {
				return res.redirect("/verificationfailure");
			}
			res.redirect("/verify");
		});
	});

	// Other routes that should redirect to index.html
	app.route('/*').get(function (req, res) {
		res.sendfile(app.get('appPath') + '/index.html');
	});

	// Upload route
	app.route('/upload').post(upload.upload);
};

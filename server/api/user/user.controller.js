'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Verificationtoken = require('../verificationToken/verificationToken.model');
var tokenController = require('../verificationToken/verificationToken.controller');
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var exphbs = require('express-handlebars');
var hbs = require('nodemailer-express-handlebars');

var transporter = nodemailer.createTransport(ses({
	accessKeyId: config.aws_credentials.accessKeyId,
	secretAccessKey: config.aws_credentials.secretAccessKey,
	region: 'us-east-1'
}));
transporter.use('compile', hbs({viewPath: config.root + '/server/views'}));

var validationError = function (res, err) {
	return res.json(422, err);
};

/**
 * Get list of users
 * Restriction: 'admin'
 */
exports.index = function (req, res) {
	User.find({}, '-salt -hashedPassword', function (err, users) {
		if (err) return res.send(500, err);
		res.json(200, users);
	});
};

/**
 * Create a user
 */
exports.create = function (req, res, next) {
	var user = new User(req.body);
	user.provider = 'local';
	user.role = 'user';
	user.save(function (err, user) {
		if (err) return validationError(res, err);
		var verificationToken = new Verificationtoken({_userId:user._id});
		tokenController.createVerificationToken(verificationToken, function(err, token){
			if (err) return console.log("Couldn't create verification token", err);
			console.log('success' + token);
			var mail = {
				from: 'satnam@hcprtc.com',
				to: 'satnamsjarria@gmail.com',
				subject: 'verify your email',
				template: 'welcome',
				context: {
					token: token,
					email: user.email
				}
			}
			transporter.sendMail(mail, function(err){
			  if(err) console.log(err);
			  else
			    console.log('success');
			});
		});
		var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
		res.json({token: token});
	});
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
	var id = req.params.id;
	User.findById(id, function (err, user) {
		if (err) return next(err);
		if (!user) return res.send(401);
		res.json(user.profile);
	});
};

/**
 * Delete a user
 * Restriction: 'admin'
 */
exports.destroy = function (req, res) {
	User.findByIdAndRemove(req.params.id, function (err, user) {
		if (err) return res.send(500, err);
		return res.send(204);
	});
};

/**
 * Change a user's password
 */
exports.changePassword = function (req, res, next) {
	var id = req.user._id;
	var oldPassword = String(req.body.oldPassword);
	var newPassword = String(req.body.newPassword);
	User.findById(id, function (err, user) {
		if (user.authenticate(oldPassword)) {
			user.password = newPassword;
			user.save(function (err) {
				if (err) return validationError(res, err);
				res.send(200);
			});
		}
		else res.send(403);
	});
};

/**
 * Set a user's type
 */
exports.setType = function (req, res, next) {
	var id = req.user._id;
	var type = String(req.body.type);
	User.findById(id, function (err, user) {
		user.type = type;
		user.save(function (err) {
			if (err) return validationError(res, err);
			res.send(200);
		});
	});
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
	var id = req.user._id;
	User.findOne({
		_id: id
	}, '-salt -hashedPassword', function (err, user) { // Don't ever give out the password or salt
		if (err) return next(err);
		if (!user) return res.json(401);
		res.json(user);
	});
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
	res.redirect('/');
};

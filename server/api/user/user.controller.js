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

function validationError(res, err) {
	return res.json(422, err);
}

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
		var verificationToken = new Verificationtoken({_userId: user._id});
		tokenController.createVerificationToken(verificationToken, function (err, token) {
			if (err) return console.log("Couldn't create verification token", err);
			console.log('success' + token);
			var verifyURL = req.protocol + "://" + req.get('host') + "/verifyUser/" + token;
			var mail = {
				from: 'satnam@hcprtc.com',
				to: user.email,
				subject: 'verify your email',
				template: 'welcome',
				context: {
					token: token,
					email: user.email,
					url: verifyURL
				}
			};
			transporter.sendMail(mail, function (err) {
				if (err) console.log(err);
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
 * Set a user's medical conditions
 */
exports.setMedicalConditions = function (req, res) {
	var id = req.user._id;
	User.findById(id, function (err, user) {
		user.medicalConditions = req.body.medicalConditions;
		user.save(function (err) {
			if (err) return validationError(res, err);
			res.send(200);
		});
	});
};

/**
 * Set a user's medications
 */
exports.setMedications = function (req, res) {
	var id = req.user._id;
	User.findById(id, function (err, user) {
		user.medications = req.body.medications;
		user.save(function (err) {
			if (err) return validationError(res, err);
			res.send(200);
		});
	});
};

/**
 * Change a user's password
 */
exports.setPassword = function (req, res) {
	var id = req.user._id;
	User.findById(id, function (err, user) {
		if (user.authenticate(req.body.oldPassword)) {
			user.password = req.body.newPassword;
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
exports.setType = function (req, res) {
	var id = req.user._id;
	User.findById(id, function (err, user) {
		user.type = req.body.type;
		switch (req.body.type) {
			case "dispensary":
			case "physician":
				user.businessName = req.body.businessName;
				user.businessAddress1 = req.body.businessAddress1;
				user.businessAddress2 = req.body.businessAddress2;
				user.businessCity = req.body.businessCity;
				user.businessState = req.body.businessState;
				user.businessZipCode = req.body.businessZipCode;
				user.businessPhone = req.body.businessPhone;
				user.businessFax = req.body.businessFax;
				user.url = req.body.url;
				break;
			case "manufacturer":
			case "purveyor":
				user.businessName = req.body.businessName;
				user.businessAddress1 = req.body.businessAddress1;
				user.businessAddress2 = req.body.businessAddress2;
				user.businessCity = req.body.businessCity;
				user.businessState = req.body.businessState;
				user.businessZipCode = req.body.businessZipCode;
				user.url = req.body.url;
				break;
			case "patient":
				user.username = req.body.username;
				user.address1 = req.body.address1;
				user.address2 = req.body.address2;
				user.city = req.body.city;
				user.state = req.body.state;
				user.zipCode = req.body.zipCode;
				break;
			case "transporter":
				user.driversName = req.body.driversName;
				user.driversLicenseNumber = req.body.driversLicenseNumber;
				break;
		}
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
	}, '-salt -hashedPassword').populate('medications medicalConditions').exec(function (err, user) {
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

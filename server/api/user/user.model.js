'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var userSchema = new Schema({
	provider: String,
	firstName: String,
	lastName: String,
	email: {
		type: String,
		lowercase: true
	},
	hashedPassword: String,
	salt: String,
	role: {
		type: String,
		default: 'user'
	},
	type: {
		type: String,
		default: ''
	},
	address1: String,
	address2: String,
	city: String,
	state: String,
	zipCode: Number,
	prescriptions: Array,
	medicalConditions: Array
});

/**
 * Virtuals
 */
userSchema.virtual('password').set(function (password) {
	this._password = password;
	this.salt = this.makeSalt();
	this.hashedPassword = this.encryptPassword(password);
}).get(function () {
	return this._password;
});

userSchema.virtual('profile').get(function () {
	return {
		'firstName': this.firstName,
		'lastName': this.lastName,
		'role': this.role
	};
});

userSchema.virtual('token').get(function () {
	return {
		'_id': this._id,
		'role': this.role
	};
});

userSchema.virtual('name').get(function () {
	return this.firstName + ' ' + this.lastName;
});

/**
 * Validations
 */

	// E-mail is blank
userSchema.path('email').validate(function (email) {
	return email.length;
}, 'E-mail is required.');

// Password is blank
userSchema.path('hashedPassword').validate(function (hashedPassword) {
	return hashedPassword.length;
}, 'Password is required.');

// E-mail already exists
userSchema.path('email').validate(function (value, respond) {
	var self = this;
	this.constructor.findOne({email: value}, function (err, user) {
		if (err) throw err;
		if (user) {
			if (self.id === user.id) return respond(true);
			return respond(false);
		}
		respond(true);
	});
}, 'E-mail already exists.');

var validatePresenceOf = function (value) {
	return value && value.length;
};

/**
 * Pre-save hook
 */
userSchema.pre('save', function (next) {
	if (!this.isNew) return next();
	if (!validatePresenceOf(this.hashedPassword)) next(new Error('Invalid password.'));
	else next();
});

/**
 * Methods
 */
userSchema.methods = {
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function () {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function (password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

/**
 * Make virtuals available on client
 */
userSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('User', userSchema);

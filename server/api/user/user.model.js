'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var _ = require('lodash');

var userSchema = new Schema({
	provider: String,
	firstName: String,
	lastName: String,
	email: {
		lowercase: true,
		type: String
	},
	hashedPassword: String,
	salt: String,
	role: {
		default: 'user',
		type: String
	},
	type: {
		default: '',
		type: String
	},
	username: String,
	address1: String,
	address2: String,
	city: String,
	state: String,
	zipCode: Number,
	medications: [
		{
			ref: 'Drug',
			type: Schema.Types.ObjectId
		}
	],
	medicalConditions: [
		{
			ref: 'MedicalCondition',
			type: Schema.Types.ObjectId
		}
	],
	verified:{
		type: Boolean,
		default:false
	}
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
userSchema.path('email').validate(function (value) {
	return value.length;
}, 'E-mail is required.');

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

// Password is blank
userSchema.path('hashedPassword').validate(function (value) {
	return value.length;
}, 'Password is required.');

// Username already exists
userSchema.path('username').validate(function (value, respond) {
	if (_.isUndefined(value)) return respond(true);
	var self = this;
	this.constructor.findOne({username: value}, function (err, user) {
		if (err) throw err;
		if (user) {
			if (self.id === user.id) return respond(true);
			return respond(false);
		}
		respond(true);
	});
}, 'Username already exists.');

/**
 * Pre-save hook
 */
userSchema.pre('save', function (next) {
	if (_.isEmpty(this.username)) this.username = undefined;
	if (_.isEmpty(this.address2)) this.address2 = undefined;
	if (_.isEmpty(this.medications)) this.medications = undefined;
	if (_.isEmpty(this.medicalConditions)) this.medicalConditions = undefined;
	if (_.isEmpty(this.hashedPassword) && this.isNew) next(new Error('Invalid password.'));
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

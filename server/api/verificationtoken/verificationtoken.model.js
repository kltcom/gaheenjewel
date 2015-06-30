'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var verificationtokenSchema = new Schema({
	_userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	token: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: '4h'
	}
});

module.exports = mongoose.model('verificationtoken', verificationtokenSchema);

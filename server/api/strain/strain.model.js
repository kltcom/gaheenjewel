'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var strainSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Strain', strainSchema);

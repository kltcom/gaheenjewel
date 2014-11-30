'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var medicalconditionSchema = new Schema({
	name: String
});

module.exports = mongoose.model('MedicalCondition', medicalconditionSchema);

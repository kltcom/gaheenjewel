'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Drug', drugSchema);

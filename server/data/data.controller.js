'use strict';

var fs = require('fs-extra');
var config = require('../config/environment');

exports.file = function (req, res) {
	res.sendfile(config.root + '/server/data/' + req.user._id + '/' + req.params.name);
};

exports.delete = function (req, res) {
	fs.unlink(config.root + '/server/data/' + req.user._id + '/' + req.params.name);
	res.send(req.params.name);
};

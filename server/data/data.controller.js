'use strict';

var config = require('../config/environment');

exports.file = function (req, res) {
	res.sendfile(config.root + '/server/data/' + req.user._id + '/' + req.params.file);
};

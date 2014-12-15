'use strict';

var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs-extra');
var config = require('../config/environment');

exports.upload = function (req, res) {
	var Form = new multiparty.Form();
	Form.parse(req, function (err, fields, files) {
		var file = files.file[0];
		var type = file.headers['content-type'];
		var oldPath = file.path;
		var index = oldPath.lastIndexOf('.');
		var extension = (index < 0) ? '' : oldPath.substr(index);
		var name = uuid.v4() + extension;
		var newPath = config.root + '/server/data/' + fields['id'] + '/' + name;

		//if (type !== 'application/msword' && type !== 'application/pdf' && type !== 'image/jpeg' && type !== 'image/jpg') {
		//	fs.unlink(tmpPath);
		//	return res.status(400).send(type);
		//}

		fs.move(oldPath, newPath, function (err) {
			if (err) {
				fs.unlink(oldPath);
				return res.status(400).send(err);
			}
			return res.send(name);
		});
	});
};

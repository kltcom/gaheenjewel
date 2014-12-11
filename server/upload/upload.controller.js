'use strict';

var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs');

exports.upload = function(req, res) {
    var Form = new multiparty.Form();
    Form.parse(req, function(err, fields, files) {
        var file = files.file[0];
        var type = file.headers['content-type'];
        var tmpPath = file.path;
        var index = tmpPath.lastIndexOf('.');
        var extension = (index < 0) ? '' : tmpPath.substr(index);
        var name = uuid.v4() + extension;
        var path = 'data/' + name;

        if (type !== 'application/msword' && type !== 'application/pdf' && type !== 'image/jpeg' && type !== 'image/jpg') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }

        fs.rename(tmpPath, path, function(err) {
            if (err) return res.status(400).send('File not saved: ');
            return res.json(path);
        });
    });
};

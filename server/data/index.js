'use strict';

var express = require('express');
var controller = require('./data.controller.js');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/:file', auth.isAuthenticated(), controller.file);

module.exports = router;

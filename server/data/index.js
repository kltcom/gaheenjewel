'use strict';

var express = require('express');
var controller = require('./data.controller.js');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/:name', auth.isAuthenticated(), controller.file);
router.delete('/:name', auth.isAuthenticated(), controller.delete);

module.exports = router;

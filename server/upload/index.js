'use strict';

var express = require('express');
var controller = require('./image.controller.js');

var router = express.Router();

router.post('/', controller.postImage);

module.exports = router;

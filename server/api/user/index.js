'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/about', auth.isAuthenticated(), controller.setAbout);
router.put('/:id/medicalconditions', auth.isAuthenticated(), controller.setMedicalConditions);
router.put('/:id/medications', auth.isAuthenticated(), controller.setMedications);
router.put('/:id/password', auth.isAuthenticated(), controller.setPassword);
router.put('/:id/type', auth.isAuthenticated(), controller.setType);
router.put('/:id/vehicleimages', auth.isAuthenticated(), controller.setVehicleImages);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /medicalconditions              ->  index
 * POST    /medicalconditions              ->  create
 * GET     /medicalconditions/:id          ->  show
 * PUT     /medicalconditions/:id          ->  update
 * DELETE  /medicalconditions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Drug = require('./medicalcondition.model.js');

exports.index = function (req, res) {
	Drug.find(function (err, medicalconditions) {
		if (err) return handleError(res, err);
		return res.json(200, medicalconditions);
	});
};

exports.search = function (req, res) {
	Drug.find({name: {$regex: new RegExp(req.params.search, 'i')}}).limit(10).exec(function (err, medicalconditions) {
		if (err) return handleError(res, err);
		return res.json(200, medicalconditions);
	});
};

exports.show = function (req, res) {
	Drug.findById(req.params.id, function (err, medicalcondition) {
		if (err) return handleError(res, err);
		if (!medicalcondition) return res.send(404);
		return res.json(medicalcondition);
	});
};

exports.create = function (req, res) {
	Drug.create(req.body, function (err, medicalcondition) {
		if (err) return handleError(res, err);
		return res.json(201, medicalcondition);
	});
};

exports.update = function (req, res) {
	if (req.body._id) delete req.body._id;
	Drug.findById(req.params.id, function (err, medicalcondition) {
		if (err) return handleError(res, err);
		if (!medicalcondition) return res.send(404);
		var updated = _.merge(medicalcondition, req.body);
		updated.save(function (err) {
			if (err) return handleError(res, err);
			return res.json(200, medicalcondition);
		});
	});
};

exports.destroy = function (req, res) {
	Drug.findById(req.params.id, function (err, medicalcondition) {
		if (err) return handleError(res, err);
		if (!medicalcondition) return res.send(404);
		medicalcondition.remove(function (err) {
			if (err) return handleError(res, err);
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}

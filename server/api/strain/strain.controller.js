/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /strains              ->  index
 * POST    /strains              ->  create
 * GET     /strains/:id          ->  show
 * PUT     /strains/:id          ->  update
 * DELETE  /strains/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Strain = require('./strain.model.js');

exports.index = function (req, res) {
	Strain.find(function (err, strains) {
		if (err) return handleError(res, err);
		return res.json(200, strains);
	});
};

exports.search = function (req, res) {
	Strain.find({name: {$regex: new RegExp(req.params.search, 'i')}}).limit(10).exec(function (err, strains) {
		if (err) return handleError(res, err);
		return res.json(200, strains);
	});
};

exports.show = function (req, res) {
	Strain.findById(req.params.id, function (err, strain) {
		if (err) return handleError(res, err);
		if (!strain) return res.send(404);
		return res.json(strain);
	});
};

exports.create = function (req, res) {
	Strain.create(req.body, function (err, strain) {
		if (err) return handleError(res, err);
		return res.json(201, strain);
	});
};

exports.update = function (req, res) {
	if (req.body._id) delete req.body._id;
	Strain.findById(req.params.id, function (err, strain) {
		if (err) return handleError(res, err);
		if (!strain) return res.send(404);
		var updated = _.merge(strain, req.body);
		updated.save(function (err) {
			if (err) return handleError(res, err);
			return res.json(200, strain);
		});
	});
};

exports.destroy = function (req, res) {
	Strain.findById(req.params.id, function (err, strain) {
		if (err) return handleError(res, err);
		if (!strain) return res.send(404);
		strain.remove(function (err) {
			if (err) return handleError(res, err);
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}

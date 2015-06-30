/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /drugs              ->  index
 * POST    /drugs              ->  create
 * GET     /drugs/:id          ->  show
 * PUT     /drugs/:id          ->  update
 * DELETE  /drugs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Drug = require('./drug.model.js');

exports.index = function (req, res) {
	Drug.find(function (err, drugs) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, drugs);
	});
};

exports.search = function (req, res) {
	Drug.find({name: {$regex: new RegExp(req.params.search, 'i')}}).limit(10).exec(function (err, drugs) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, drugs);
	});
};

exports.show = function (req, res) {
	Drug.findById(req.params.id, function (err, drug) {
		if (err) {
			return handleError(res, err);
		}
		if (!drug) {
			return res.send(404);
		}
		return res.json(drug);
	});
};

exports.create = function (req, res) {
	Drug.create(req.body, function (err, drug) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, drug);
	});
};

exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Drug.findById(req.params.id, function (err, drug) {
		if (err) {
			return handleError(res, err);
		}
		if (!drug) {
			return res.send(404);
		}
		var updated = _.merge(drug, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, drug);
		});
	});
};

exports.destroy = function (req, res) {
	Drug.findById(req.params.id, function (err, drug) {
		if (err) {
			return handleError(res, err);
		}
		if (!drug) {
			return res.send(404);
		}
		drug.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}

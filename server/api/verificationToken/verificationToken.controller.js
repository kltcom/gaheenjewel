'use strict';

var _ = require('lodash');
var VerificationtokenModel = require('./verificationToken.model');
var uid = require('rand-token').uid;
var userModel = require('../user/user.model');

//create verification token
exports.createVerificationToken = function(vfToken, done){
	var token = uid(16);
	var Verificationtoken = vfToken;
	Verificationtoken.set('token', token);
	Verificationtoken.save(function(err){
		if(err) return done(err);
		return done(null, token);
	});
};
//verify user
exports.verifyUser = function(token, res,  done) {
	VerificationtokenModel.findOne({token: token}, function (err, doc){
		if (err) {return handleError(res, err);}
		if(!doc) return handleError(res, 401);
		console.log(doc);
		userModel.findOne({_id: doc._userId}, function (err, user) {
			if (err) return done(err);
			user["verified"] = true;
			console.log(user.verified);
			user.save(function(err, user) {
				if(err) return validationError(res, err);
				done(err);
			});
		});

	});
};

// Get list of verificationTokens
exports.index = function(req, res) {
  Verificationtoken.find(function (err, verificationTokens) {
    if(err) { return handleError(res, err); }
    return res.json(200, verificationTokens);
  });
};

// Get a single verificationToken
exports.show = function(req, res) {
  Verificationtoken.findById(req.params.id, function (err, verificationToken) {
    if(err) { return handleError(res, err); }
    if(!verificationToken) { return res.send(404); }
    return res.json(verificationToken);
  });
};

// Creates a new verificationToken in the DB.
exports.create = function(req, res) {
  Verificationtoken.create(req.body, function(err, verificationToken) {
    if(err) { return handleError(res, err); }
    return res.json(201, verificationToken);
  });
};

// Updates an existing verificationToken in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Verificationtoken.findById(req.params.id, function (err, verificationToken) {
    if (err) { return handleError(res, err); }
    if(!verificationToken) { return res.send(404); }
    var updated = _.merge(verificationToken, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, verificationToken);
    });
  });
};

// Deletes a verificationToken from the DB.
exports.destroy = function(req, res) {
  Verificationtoken.findById(req.params.id, function (err, verificationToken) {
    if(err) { return handleError(res, err); }
    if(!verificationToken) { return res.send(404); }
    verificationToken.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

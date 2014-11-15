/**
 * PropertyController
 *
 * @description :: Server-side logic for managing Properties
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require('async'),
  util = require('util');


module.exports = {
  create: function(req, res, next) {
    var params = req.params.all();
    var landlord_id = params.owner_id;

    async.series([
      function(cb) {
        Landlord.findOne(landlord_id, function(err, landlord) {
          if (landlord === undefined) return res.json(404, {message: 'Landlord not found, id: ' + landlord_id });
          if (err) return cb(err);
          cb(null);
        });
      },
      function(cb) {
        Property.create(params, function(err, property) {
          if (err) return cb(err);
          return res.status(201).json(property);
          cb(null);
        });
      }
    ], function(err) {
      if (err){
        return res.status(500).json({message: 'duplicate entry'});
      }
    });
  },

  update: function(req, res, next) {
    var criteria = {};
    criteria = _.merge({}, req.params.all(), req.body);
    var id = req.param('id');
    if (!id) {
      return res.badRequest('No id provided.');
    }
    Property.update(id, criteria, function(err, result) {
      if (result.length === 0) return res.notFound();
      if (err) return next(err);
      res.json(200, result);
    });
  },

  find: function(req, res, next) {
    var id = req.param('id');
    if (id) {
      Property.findOne(id, function(err, property) {
        if (property === undefined) return res.notFound();
        if (err) return next(err);
        res.json(200, property)
      });
    } else {
      var where = req.param('where');
      var options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip') || undefined,
        sort: req.param('sort') || undefined,
        where: where || undefined
      };
      Property.find(options, function(err, result) {
        if (result === undefined) return res.notFound();
        if (err) return next(err);
        res.status(200).json(result);
      });
    }
  },

  destroy: function(req, res, next) {
    // must be authenticated ?!?
    console.log('called');
    if (req.user) {
      console.log('I can delete things');
    } else {
      res.status(403).json({
        message: 'Not authenticated'
      });
    }
  }
};
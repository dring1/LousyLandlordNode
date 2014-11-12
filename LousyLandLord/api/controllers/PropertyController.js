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
          if (landlord === undefined)
            return res.json(404, {message: 'Landlord not found, id: ' + landlord_id});
          if (err) return cb(err);
          cb(null);
        });
      },
      function(cb) {
        Property.create(params, function(err, property) {
          if (err) return cb(err);
          res.json(200, property);
          cb(null);
        });
      }
    ], function(err) {
      if (err) return new Error(util.inspect(err));
    });
  },

  update: function(req, res, next) {
    
  },

  find: function(req, res, next) {
    
  },

  destroy: function(req, res, next) {
    
  }
};
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
        console.log('property create params', params);
        // if no id search by name
        if (params.property.owner_id) {
          Landlord.findOne(landlord_id, function(err, landlord) {
            if (err) return cb(err);
            landlord_id = landlord.id;
            cb(null);
          });
        } else if (params.property.name === 1) {
          Landlord.findByName(params.property.name, function(err, landlord) {
            console.log(landlord);
            landlord_id = landlord.id;
            cb(null);
          });
        } else {
          var newLandlord = {
            name: params.property.name,
            organization: params.property.organization,
            city: params.property.city,
            province: params.property.province
          };
          Landlord.create(newLandlord, function(err, landlord) {
            if (err) return cb(err);
            landlord_id = landlord.id;

            console.log('new landlord', landlord);
            cb(null);
          });
        }
      },
      function(cb) {
        params.property.owner_id = landlord_id;
        console.log(params);
        Property.create(params.property, function(err, property) {
          if (err) return cb(err);
          landlord_id = landlord.id;
          //return res.status(201).json(property);
          cb(null);
        });
      }
    ], function(err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'duplicate entry'
        });
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

  findAll: function(req, res, next) {
    // var where = req.param('where');
    var options = {
      limit: req.param('limit') || undefined,
      skip: req.param('skip') || undefined,
      sort: req.param('sort') || undefined,
      where: req.param('where') || undefined
        //where: {owner_id: '54a4ab12b32e396db7930a73'}//req.param('where') || undefined
    };
    Property.find(options, function(err, result) {
      if (result === undefined) return res.notFound();
      if (err) return next(err);
      // console.log('properties result', result);
      res.status(200).json(result);
    });
  },

  search: function(req, res, next) {
    var options = {
      where: req.body.where || undefined
        //where: {owner_id: '54a4ab12b32e396db7930a73'}//req.param('where') || undefined
    };
    console.log('property find all\n options: ', options);
    Property.find(options, function(err, result) {
      if (result === undefined) return res.notFound();
      if (err) return next(err);
      // console.log('properties result', result);
      res.status(200).json(result);
    });
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

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
        if (params.property.owner_id) {
          Landlord.findOne(landlord_id, function(err, landlord) {
            if (err) return cb(err);
            landlord_id = landlord.id;
            cb(null);
          });
        }
        if (params.property.name !== undefined) {
          Landlord.findByName(params.property.name, function(err, landlord) {
            if (err || landlord.length === 0) return cb(err);
            console.log('getByName', landlord);
            landlord_id = landlord[0].id;
            cb(null);
          });
        }
      },
      function(cb) {
        // if we found something skip this landlord creation step
        if(landlord_id !== undefined){
          return cb(null);
        }
        var newLandlord = {
          name: params.property.name,
          organization: params.property.organization,
          city: params.property.location.city,
          province: params.property.location.province
        };
        Landlord.create(newLandlord, function(err, landlord) {
          if (err) return cb(err);
          console.log('Landlord.create From PropertyController', landlord);
          landlord_id = landlord.id;
          cb(null);
        });
      },
      function(cb) {
        params.property.owner_id = landlord_id;
        Property.create(params.property, function(err, property) {
          if (err) return cb(err);
          return res.status(201).json({property: property});
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
      var options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip') || undefined,
        sort: req.param('sort') || undefined,
        where:  req.param('where') || undefined
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


function getByLandlordName (name) {
  Landlord.findByName(name, function(err, landlord) {
    if(err) return undefined;
    console.log('get by name', landlord);
    return landlord;
  });
}

function getByLandlordID (id) {
  Landlord.findOne(id, function(err, landlord) {
    if (err) return undefined;
    return landlord;
  });
}

/**
 * LandlordController
 *
 * @description :: Server-side logic for managing Landlords
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var _ = require('underscore');

module.exports = {
  create: function(req, res, next) {
    var params = req.params.all();

    Landlord.create(params, function(err, result) {
      if (err) return res.badRequest('Landlord already exists');
      return res.json(201, result);
    });
  },

  find: function(req, res, next) {
    var id = req.param('id');
    if (id) {
      Landlord.findOne(id, function(err, landlord) {
        if (landlord === undefined) return res.notFound();
        if (err) return next(err);
        res.json(200, landlord)
      });
    } else {
      // if no is provided assume a query
      // var query = req.query;
      // console.log(query);
      // use custom sailsjs query language for performance gains.. i guess
      // followed http://irlnathan.github.io/sailscasts/blog/2014/01/14/sailscasts-answers-ep7-how-do-i-create-a-restful-json-crud-api-in-sails-from-scratch/
      var where = req.param('where');
      var options = {
        limit: req.param('limit') || undefined,
        skip: req.param('skip') || undefined,
        sort: req.param('sort') || undefined,
        where: where || undefined
      };
      console.log("This is the options", options);
      Landlord.find(options, function(err, result) {
        if (result === undefined) return res.notFound();
        if (err) return next(err);
        res.json(result);
      });
    }
  },

  update: function(req, res, next) {
    var criteria = {};
    criteria = _.merge({}, req.params.all(), req.body);
    var id = req.param('id');
    if (!id) {
      return res.badRequest('No id provided.');
    }
    Landlord.update(id, criteria, function(err, result) {
      if (result.length === 0) return res.notFound();
      if (err) return next(err);
      res.json(200, result);
    });
  },

  destroy: function(req, res, next) {
    var id = req.param('id');
    if (!id) return res.badRequest('No id provided.');
    Landlord.findOne(id, function(err, result) {
      if (err) return res.serverError(err);
      if (!result) return res.notFound();
      Landlord.destroy(id, function(err) {
        if (err) return next(err);
        res.json(200, result);
      });
    });
  }
};
var PropertyController = require('../../../api/controllers/PropertyController'),
  fixtures = require('../../fixtures'),
  request = require('supertest'),
  should = require('should'),
  Chance = require('chance'),
  chance = new Chance(),
  util = require('util'),
  async = require('async');

describe('PropertyController', function() {
  var url = fixtures.url;

  it('should create property with geolocation', function(done) {
    fixtures.landlord.name = chance.name();
    async.series([
      function(cb) {
        request(url)
          .post('landlord')
          .send(fixtures.landlord)
          .expect(201)
          .end(function(err, res) {
            if (err) return cb(err);
            res.body.name.should.equal(fixtures.landlord.name);
            fixtures.property.owner_id = fixtures.landlord.id = res.body.id;
            cb(null)
          });
      },
      function(cb) {
        request(url)
          .post('property')
          .send(fixtures.property)
          .expect(201)
          .end(function(err, res) {
            if (err) return cb(err);
            res.body.location.should.containDeep(fixtures.property.location);
            fixtures.property.id = res.body.id;
            cb(null)
          });
      }
    ], function(err) {
      if (err) return new Error(util.inspect(err))
      done();
    });
  });

  it('should read property', function(done) {
    request(url)
      .get('property/' + fixtures.property.id)
      .expect(200)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body.owner_id.should.equal(fixtures.landlord.id);
        done();
      });
  });

  it('should query property', function(done) {
    var query = '?where={owner_id: \"' + fixtures.landlord.id + '\"}'
    request(url)
      .get('property' + query)
      .expect(200)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body[0].owner_id.should.equal(fixtures.landlord.id);
        done();
      });
  });

  xit('should update property', function(done) {
    var new_name = fixtures.landlord.name = chance.name();
    request(url)
      .put('landlord/' + fixtures.landlord.id)
      .send({name: new_name})
      .expect(200)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body[0].name.should.equal(fixtures.landlord.name);
        done();
      });
  });

  xit('should destroy a landlord by id', function(done) {
    request(url)
      .del('landlord/'+ fixtures.landlord.id)
      .send(fixtures.landlord.id)
      .expect(200)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body.id.should.equal(fixtures.landlord.id);
        done();
      });
  });
});
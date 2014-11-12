var LandlordController = require('../../../api/controllers/LandlordController'),
  request = require('supertest'),
  should = require('should'),
  Chance = require('chance'),
  chance = new Chance(),
  util = require('util');

describe('LandlordController', function() {
  var url = "http://localhost:1337/";
  var fixtures = {
    landlord: {
      name: chance.name(),
      city: 'Ottawa',
      province: 'Ontario'
    }
  };

  it('should redirect create landlord', function(done) {
    request(url)
      .post('landlord')
      .send(fixtures.landlord)
      .expect(201)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body.name.should.equal(fixtures.landlord.name);
        fixtures.landlord.id = res.body.id;
        done();
      });
  });

  it('should read landlord', function(done) {
    request(url)
      .get('landlord/' + fixtures.landlord.id)
      .expect(200)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        res.body.name.should.equal(fixtures.landlord.name);
        done();
      });
  });

  it('should update landlord', function(done) {
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

  it('should destroy a landlord by id', function(done) {
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
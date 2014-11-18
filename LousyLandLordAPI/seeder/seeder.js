var LandlordController = require('../api/controllers/LandlordController'),
  PropertyController = require('../api/controllers/PropertyController'),
  request = require('supertest'),
  should = require('should'),
  Chance = require('chance'),
  chance = new Chance(),
  util = require('util'),
  async = require('async');



var landlord_ids = [];
var landlords = [];

for(var i = 0;i<100;i++){
  var landlord = {
    name: chance.name(),
    city: chance.city(),
    province: chance.province(),
    organization: 'Vandelay Industries'
  };
  landlords.push(landlord);
}


console.log('Create Landlords');


landlords.forEach(function(landlord) {
  request('http://localhost:' + process.env.PORT + '/')
      .post('landlord')
      .send(landlord)
      .expect(201)
      .end(function(err, res) {
        if (err) throw new Error(util.inspect(err));
        landlord_ids.push(res.body.id);
        if(landlord_ids.length === 100){
          console.log('ewpepw');
        }
      });
});


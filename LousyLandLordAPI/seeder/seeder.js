var LandlordController = require('../api/controllers/LandlordController'),
  PropertyController = require('../api/controllers/PropertyController'),
  request = require('request'),
  should = require('should'),
  Chance = require('chance'),
  chance = new Chance(),
  util = require('util'),
  async = require('async');



var landlord_ids = [],
  property_ids = [],
  landlords = [],
  properties = [];

async.series([
  function(cb) {
    console.log('Create Landlords');

    // sync create
    for (var i = 0; i < 100; i++) {
      var landlord = {
        name: chance.name(),
        city: chance.city(),
        province: chance.province(),
        organization: 'Vandelay Industries'
      };
      landlords.push(landlord);
    }

    landlords.forEach(function(landlord) {
      var options = {
        url: 'http://localhost:' + 9015 + '/landlord',
        method: 'post',
        json: true,
        body: landlord
      }

      request(options, function(err, res, body) {
        landlord_ids.push(body.id);
        if (landlord_ids.length == 100) cb(null);
      });
    });

  },
  function(cb) {
    console.log('Create Properties');

    // sync create
    for (var i = 0; i < 10; i++) {
      var property = {
        property: {
          owner_id: landlord_ids[Math.floor(Math.random() * landlord_ids.length)],
          location: chance.address() + ' Canada',
          comment: chance.sentence(),
          longitude: chance.longitude(),
          latitude: chance.latitude(),
          point: {
            x: chance.longitude(),
            y: chance.latitude()
          }
        }
      }
      properties.push(property);
    }


    properties.forEach(function(property) {
      var options = {
        url: 'http://localhost:' + 9015 + '/property',
        method: 'post',
        json: true,
        body: property
      }
      setTimeout(function() {
        request(options, function(err, res, body) {
          property_ids.push(body.id);
          if (property_ids.length === 10) cb(null);
        });
      }, 10000);

    });
  }
], function(cb) {
  console.log('Im so proud you seeded some stuff :D');
});


// for (var i = 0; i < 1000; i++) {
//   var property = {
//     owner_id: landlord_ids[Math.floor(Math.random() * landlord_ids.length)],
//     location: {
//       address: chance.address(),
//       city: chance.city(),
//       province: chance.province(),
//       country: 'Canada',
//       postalCode: chance.postal()
//     },
//     longitude: chance.longitude(),
//     latitude: chance.latitude()
//   }
//   properties.push(property);
// }

// properties.forEach(function(property) {
//     //console.log(property);
//     request('http://localhost:' + 9104 + '/')
//       .post('property')
//       .send(property)
//       .expect(201)
//       .end(function(err, res) {
//         if (err) throw new Error(util.inspect(err));
//         console.log('pew');
//       });
// });

var geocoderProvider = 'google',
  httpAdapter = 'http',
  geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, {});
module.exports = {

  attributes: {
    owner_id: {
      required: true,
      type: 'string'
    },
    location: {
      //turn into relationship me tinks?
      required: true,
      type: 'object',
      unique: true
    },
    comment: {
      required: false,
      type: 'string'
    },
    longitude: {
      required: false,
      type: 'string'
    },
    latitude: {
      required: false,
      type: 'string'
    }
  },

  beforeCreate: function(values, cb) {
    if(values.longitude && values.latitude) cb();
    var address = [values.location.address, values.location.city,
      values.location.province, values.location.country, values.location.postalCode
    ].join(', ');
    geocoder.geocode(address, function(err, geo) {
      if (err) return cb(err);
      var loc = geo[0]
      values.longitude = loc.longitude;
      values.latitude = loc.latitude;
      cb();
    });
  }
};

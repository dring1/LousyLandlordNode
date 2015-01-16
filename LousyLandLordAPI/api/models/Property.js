var geocoderProvider = 'google',
  httpAdapter = 'http',
  geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, {});
module.exports = {

  types: {
    location: function(val) {
      // return (
      //   _.isString(val.address) &&
      //   val.address.length > 3 &&
      //   val.address.length < 120 &&
      //
      // )

      var location = [{
        name: 'address',
        min: 6,
        max: 120,
        required: true
      }, {
        name: 'city',
        min: 2,
        max: 120,
        required: true
      }, {
        name: 'province',
        min: 2,
        max: 120,
        required: true
      }, {
        name: 'postal',
        min: 6,
        max: 6,
        required: true
      }, {
        name: 'unit',
        min: 0,
        max: 5
      }];

      _.each(location, function(attr) {
        if (attr.required && val[attr.name] === undefined){
          return false;
        }
        if (attr.min > val[attr.name].length) {
          return false;
        }
        if (attr.max < val[attr.name].length) {
          return false;
        }

        // if regex, does it meet

        //return true;
      })
     return true;
    }
  },

  attributes: {
    owner_id: {
      required: true,
      type: 'string'
    },
    location: {
      //turn into relationship me tinks?
      // nested fields
      required: true,
      type: 'json',
      unique: true,
      location: true
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
    if (values.longitude && values.latitude) cb();
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

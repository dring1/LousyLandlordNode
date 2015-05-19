var geocoderProvider = 'google',
  httpAdapter = 'http',
  geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, {});
module.exports = {
  types: {
    location: function(val) {
      var supportedCountries = ['Canada', 'USA', 'United States', 'United States of America'];
      for(var i = 0; i < supportedCountries.length; i++){
        if(val.indexOf(supportedCountries[i]) > -1){
          return true;
        }
      }

      geocoder.geocode(val, function(err, geo) {
        console.log(err);
        // if (err) return false;
        // return err || true;
        return err === undefined ? true : false;
      });
      return false;
    },
    point: function(loc) {
      return loc.x && loc.y
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
      type: 'string',
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
    },
    geo_point: {
      required: false,
      point: true
    }
  },

  beforeCreate: function(values, cb) {
    geocoder.geocode(values.location, function(err, geo) {
      if (err) return cb(err);
      console.log(values);
      var loc = geo[0]

      values.longitude = loc.longitude;
      values.latitude = loc.latitude;
      cb();
    });
  }
};

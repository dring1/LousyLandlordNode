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

      //   var location = [{
      //     name: 'address',
      //     min: 6,
      //     max: 120,
      //     required: true
      //   }, {
      //     name: 'city',
      //     min: 2,
      //     max: 120,
      //     required: true
      //   }, {
      //     name: 'province',
      //     min: 2,
      //     max: 120,
      //     required: true
      //   }, {
      //     name: 'postal',
      //     min: 6,
      //     max: 6,
      //     required: true
      //   }, {
      //     name: 'unit',
      //     min: 0,
      //     max: 5
      //   }];
       //
      //   _.each(location, function(attr) {
      //     if (attr.required && val[attr.name] === undefined){
      //       return false;
      //     }
      //     if (attr.min > val[attr.name].length) {
      //       return false;
      //     }
      //     if (attr.max < val[attr.name].length) {
      //       return false;
      //     }
       //
      //     // if regex, does it meet
       //
      //     //return true;
      //   })
      //  return true;

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
    // if (values.longitude && values.latitude) cb();
    // var address = [values.location.address, values.location.city,
    //   values.location.province, values.location.country, values.location.postalCode
    // ].join(', ');
    // if(values.longitude !== undefined || values.latitude)
    geocoder.geocode(values.location, function(err, geo) {
      if (err) return cb(err);
      var loc = geo[0]
      console.log(geo);
      values.longitude = loc.longitude;
      values.latitude = loc.latitude;
      cb();
    });
  }
};

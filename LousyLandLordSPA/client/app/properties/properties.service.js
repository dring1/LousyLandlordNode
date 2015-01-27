'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('propertyService', function($http, $q, config) {

    function getProperties(where) {
      var deferred = $q.defer();
      $http.get(config.getBaseURL() + 'properties', {
          params: {
            skip: 0,
            limit: 100,
            where: where || undefined
          }
        })
        .then(function(properties) {
          //console.log(properties);
          deferred.resolve(properties.data);
        });
      return deferred.promise;
    }

    function getProperty(id) {
      var deferred = $q.defer();
      $http.get(config.getBaseURL() + 'property/' + id)
        .then(function(property) {
          console.log(property);
          deferred.resolve(property.data);
        });
      return deferred.promise;
    }

    function searchProperties(query) {
      var deferred = $q.defer();
      $http.post(config.getBaseURL() + 'properties/search', {
          where: query
        })
        .then(function(property) {
          console.log(property);
          deferred.resolve(property.data);
        });
      return deferred.promise;
    }

    function submitProperty(property){
      var deferred = $q.defer();
      $http.post(config.getBaseURL() + 'property', {property: property})
      .then(function(property) {
        console.log(property);
        deferred.resolve(property.data);
      })
      .catch(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function convertPlaceToLocation(place){
      var adrCmpnts = place.address_components;
      var location = {};
      for(var i = 0;i<adrCmpnts.length; i++){
        location[adrCmpnts[i].types[0]] = adrCmpnts[i].long_name;
      }
      console.log(location);
      return location;
      // assuming the structure of the object is that of a g place
      // var number, street, neighborhood, suburb,
      // var unit = place.address_components[0],
      //     street = place.address_components[0]
      // don't mind the godawful hardcoding...
      // var street_number = address_components[0].long_name;
      // var street = address_components[1].long_name;
      // var city = address_components[3].long_name;
      // var province = address_components[5].long_name;
      // var country = address_components[6].long_name;
      // var postal_code = address_components[7].long_name;
      // return {
      //   address: [street_number, street].join(' '),
      //   city: city,
      //   province: province,
      //   postal: postal_code,
      //   country: country
      // }
    }

    return {
      getProperties: getProperties,
      getProperty: getProperty,
      searchProperties: searchProperties,
      submitProperty: submitProperty,
      convertPlaceToLocation: convertPlaceToLocation
    };
  });

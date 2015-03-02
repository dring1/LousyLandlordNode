'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('propertyService', function($http, $q, configService) {

    function getProperties(where) {
      var deferred = $q.defer();
      $http.get(configService.getBaseURL() + 'properties', {
          params: {
            skip: 0,
            limit: 100,
            where: where || undefined
          }
        })
        .then(function(properties) {
          deferred.resolve(properties.data);
        });
      return deferred.promise;
    }

    function getProperty(id) {
      var deferred = $q.defer();
      $http.get(configService.getBaseURL() + 'property/' + id)
        .then(function(property) {
          console.log(property);
          deferred.resolve(property.data);
        });
      return deferred.promise;
    }

    function searchProperties(query) {
      var deferred = $q.defer();
      $http.post(configService.getBaseURL() + 'properties/search', {
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
      $http.post(configService.getBaseURL() + 'property', {property: property})
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
    }

    return {
      getProperties: getProperties,
      getProperty: getProperty,
      searchProperties: searchProperties,
      submitProperty: submitProperty,
      convertPlaceToLocation: convertPlaceToLocation
    };
  });

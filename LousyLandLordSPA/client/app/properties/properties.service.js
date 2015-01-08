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

    return {
      getProperties: getProperties,
      getProperty: getProperty,
      searchProperties: searchProperties,
      submitProperty: submitProperty
    };
  });

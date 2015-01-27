'use strict';

angular.module('LousyLandlordMobileApp')
  .factory('landlordService', function($http, $q, config) {
    // Service logic
    // ...


    function getLandlords() {
      $http.get(config.getBaseURL() + 'landlords')
        .then(function(landlords) {
          console.log(landlords);
        });
    }

    function getLandlord(id) {
      var deferred = $q.defer();
      $http.get(config.getBaseURL() + 'landlord/' + id)
        .then(function(landlord) {
          console.log('Landlords', landlord);
          deferred.resolve(landlord);
        })
        .catch(function(err) {
          console.log('error landlordsSerive', err);
        });
      return deferred.promise;
    }

    function submitLandlord(landlord){
      var deferred = $q.defer();
      $http.post(config.getBaseURL() + 'landlord', {landlord: landlord})
      .then(function(result) {
        console.log(result);
        deferred.resolve(result);
      })
      .catch(function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    return {
      getLandlord: getLandlord,
      getLandlords: getLandlords,
      submitLandlord: submitLandlord
    };
  });

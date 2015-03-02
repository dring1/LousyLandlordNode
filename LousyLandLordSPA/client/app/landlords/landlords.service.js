'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('landlordService', function($http, $q, configService) {
    // Service logic
    // ...


    // function getLandlords() {
    //   $http.get(configService.getBaseURL() + 'landlords')
    //     .then(function(landlords) {
    //     });
    // }

    function getLandlord(id) {
      var deferred = $q.defer();
      $http.get(configService.getBaseURL() + 'landlord/' + id)
        .then(function(landlord) {
          deferred.resolve(landlord);
        })
        .catch(function(err) {
          console.log('error landlordsSerive', err);
        });
      return deferred.promise;
    }

    function submitLandlord(landlord){
      var deferred = $q.defer();
      $http.post(configService.getBaseURL() + 'landlord', {landlord: landlord})
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
      // getLandlords: getLandlords,
      submitLandlord: submitLandlord
    };
  });

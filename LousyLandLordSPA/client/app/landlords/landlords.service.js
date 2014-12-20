'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('landlords', function($http, config, Restangular) {
    // Service logic
    // ...


    function getLandlord (id) {

    }

    function getLandlords () {
      $http.get(config.getBaseURL() + 'landlord')
      .success(function(landlords) {
        console.log('Landlords', landlords);
      })
      .catch(function(err) {
        console.log('error landlordsSerive', err);
      });

    }

    // Public API here
    return {
      getLandlord: getLandlord,
      getLandlords: getLandlords
    };
  });

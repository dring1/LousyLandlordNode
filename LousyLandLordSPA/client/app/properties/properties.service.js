'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('properties', function($http, config) {
    // Service logic
    // ...

    $http.get(config.getBaseURL() + 'property')
      .success(function(properties) {
        console.log('Properties', properties);
      })
      .catch(function(err) {
        console.log('error landlordsSerive', err);
      });

    // Public API here
    return {
      someMethod: function() {
        return meaningOfLife;
      }
    };
  });
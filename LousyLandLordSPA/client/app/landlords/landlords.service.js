'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('landlords', function ($http) {
    // Service logic
    // ...
    $http.get('http://localhost:9104/landlord')
    .success(function(landlords) {
      console.log(landlords);
    });
    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });

'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('HomeCtrl', function ($scope, $cookieStore) {
    var visited = $cookieStore.get('prevVisited');
    if(visited){

      console.log('Already been here kappa', visited);
    } else {
      console.log('Have not been here kappa');
      $cookieStore.put('prevVisited', true);
    }
    //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });

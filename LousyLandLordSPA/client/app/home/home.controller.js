'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('HomeCtrl', function ($scope, $cookieStore) {
    var visited = $cookieStore.get('prevVisited');
    if(visited){
    } else {
      $cookieStore.put('prevVisited', true);
    }
  });

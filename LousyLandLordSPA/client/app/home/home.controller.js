'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.message = 'Hello';


    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });

'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('HomeCtrl', function ($scope, landlords) {
    $scope.message = 'Hello';


    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  });

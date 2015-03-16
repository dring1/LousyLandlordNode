/* global google */
'use strict';

angular.module('LousyLandlordMobileApp')
  .controller('SearchController', function($scope, $rootScope) {
    $scope.place = null;
    $scope.noPlace = false;
    $scope.autocompleteOptions = {
      componentRestrictions: {
        country: 'ca'
      },
      types: ['geocode'],
      watchEnter: true,
      location: new google.maps.LatLng(45.4248, -75.6992),
      radius: 70000
    };
    $scope.addProperty = false;

    $scope.$watch('place', function(place) {
      if (!place) {
        return;
      }
      if (!place.geometry) {
        return;
      }
      // if
      $scope.addProperty = true;
      var loc = {
        lat: parseFloat(place.geometry.location.k),
        lng: parseFloat(place.geometry.location.D)
      };
      // zoom to location
      $rootScope.$broadcast('map:zoom', loc);
      $rootScope.$broadcast('zoom_changed');
      // $rootScope.$broadcast('property:selected', place);
    });

    function clear() {
      $scope.place = null;
      $scope.addProperty = false;

      $rootScope.$broadcast('close');
    }

    $scope.clear = clear;

    $scope.add = function() {
      if (!$scope.place) {
        $scope.noPlace = true;
        return;
      }
      $scope.noPlace = false;
      $rootScope.$broadcast('addProperty', $scope.place);
    };

    $rootScope.$on('property:update', function() {
      clear();
    });
  });

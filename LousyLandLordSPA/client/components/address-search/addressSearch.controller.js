/* global google */
'use strict';

angular.module('lousyLandLordSpaApp')
.controller('AddressSearchCtrl', function($rootScope, $scope) {
  $scope.disable = false;

  $scope.place = null;
  $scope.autocompleteOptions = {
    componentRestrictions: { country: 'ca' },
    types: ['geocode'],
    watchEnter: true,
    location: new google.maps.LatLng(45.4248, -75.6992),
    radius: 70000
  };


  $scope.$watch('place', function(place) {
    if(!place) { return; }
    if(!place.geometry) { return; }
    var loc = {
      lat: parseFloat(place.geometry.location.A),
      lng: parseFloat(place.geometry.location.F)
    };
    // zoom to location
    $rootScope.$broadcast('map:zoom', loc);
    $rootScope.$broadcast('property:selected', place);
  });


  $rootScope.$on('property:create', function() {
    console.log('property created clear search');
    $scope.place = null;
  });

  $rootScope.$on('modal:open', function() {
    $scope.disable = true;
  });

  $rootScope.$on('modal:close', function() {
    $scope.disable = false;
  });
});

/* global google */
'use strict';

angular.module('lousyLandLordSpaApp')
.controller('AddressSearchCtrl', function($rootScope, $scope) {

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
    console.log('place',place);
    if(!place.geometry) { return; }
    var lat = parseFloat(place.geometry.location.k),
    lng = parseFloat(place.geometry.location.D)
    // zoom to location

  });

});

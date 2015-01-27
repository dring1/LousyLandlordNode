/*jshint -W106 */
'use strict';

angular.module('LousyLandlordMobileApp')
.controller('InfoController', function ($scope, $q, propertyService, landlordService) {
  $scope.propertyPanel = false;
  $scope.landlordPanel = false;

  $scope.$on('property:select', function(e, property) {
    closePanels();
    $scope.property = property.property;
    var owner_id = property.property.owner_id,
        landlordPromise = landlordService.getLandlord(owner_id),
        propertyPromise = propertyService.searchProperties({owner_id: owner_id});
    $q.all([landlordPromise, propertyPromise])
    .then(function(data) {
      console.log('data', data[0], data[1]);
      $scope.landlord = data[0].data;
      $scope.properties = data[1].data;
      $scope.propertyPanel = true;
    });
  });

  $scope.$on('landlord:select', function(e, landlord) {
    closePanels();
    $scope.landlord = landlord;
    propertyService.searchProperties({owner_id: landlord.id})
    .then(function(properties) {
      $scope.landlord.comments = _.pluck(properties, 'comment');
      $scope.landlord.properties = properties;
      $scope.landlordPanel = true;
    });
  });


  function closePanels() {
    $scope.propertyPanel = false;
    $scope.landlordPanel = false;
    $scope.showAllComments = false;
    $scope.showAllProperties = false;
  }

  $scope.closePanels =  closePanels;


  $scope.showLandlord = function(landlord) {
    closePanels();
    $scope.$broadcast('landlord:select', landlord);

  };

  $scope.showProperty = function(property) {
    closePanels();
    $scope.$broadcast('property:select', property);
  };

  $scope.showAllComments = false;
  $scope.showAllProperties = false;

  $scope.showComments = function() {
    $scope.showAllComments = true;
  };

  $scope.showProperties = function() {
    $scope.showAllProperties = true;
  };
});

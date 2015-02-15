/*jshint -W106 */
'use strict';

angular.module('lousyLandLordSpaApp')
.controller('InfoCtrl', function ($rootScope, $scope, $q, landlordService, propertyService) {

  $scope.frame = false;
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
      $scope.landlord = data[0].data;
      $scope.properties = data[1].data;
      $scope.frame =  $scope.propertyPanel = true;
    });
  });

  $scope.$on('landlord:select', function(e, landlord) {
    closePanels();
    $scope.landlord = landlord;
    propertyService.searchProperties({owner_id: landlord.id})
    .then(function(properties) {
      $scope.landlord.comments = _.pluck(properties, 'comment');
      $scope.landlord.properties = properties;
      $scope.frame = $scope.landlordPanel = true;

    });
  });


  function closePanels() {
    $scope.frame = false;
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

  // $rootScope.$on('modal:close', function() {
  //   closeAllPanels();
  // });
  //
  // $rootScope.$on('modal:open', function() {
  //   // body...
  // });
});

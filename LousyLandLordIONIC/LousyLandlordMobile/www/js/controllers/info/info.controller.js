/*jshint -W106 */
'use strict';

angular.module('LousyLandlordMobileApp')
  .controller('InfoController', function($scope, $rootScope, $q, propertyService, landlordService) {
    $scope.propertyPanel = false;
    $scope.landlordPanel = false;
    $scope.cards = [];
    $scope.frame = false;

    $scope.$on('property:select', function(e, property) {
      closePanels();
      $scope.property = property.property;
      var owner_id = property.property.owner_id,
        landlordPromise = landlordService.getLandlord(owner_id),
        propertyPromise = propertyService.searchProperties({
          owner_id: owner_id
        });
      $q.all([landlordPromise, propertyPromise])
        .then(function(data) {
          console.log('data', data[0], data[1]);
          $scope.landlord = data[0].data;
          $scope.properties = data[1].data;
          $scope.propertyPanel = true;
          $scope.frame = true;
          $scope.cards = [

          ]
          $scope.cards.push($scope.property);

        });
    });

    $scope.$on('landlord:select', function(e, landlord) {
      closePanels();
      $scope.landlord = landlord;
      propertyService.searchProperties({
          owner_id: landlord.id
        })
        .then(function(properties) {
          $scope.landlord.comments = _.pluck(properties, 'comment');
          $scope.landlord.properties = properties;
          $scope.landlordPanel = true;
        });
    });


    function closePanels() {
      console.log('closing');
      $scope.propertyPanel = false;
      $scope.landlordPanel = false;
      $scope.cards = [];
      $scope.frame = false;
    }

    $scope.closePanels = closePanels;


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

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
      $scope.propertyPanel = false;
      $scope.landlordPanel = false;

      $scope.cards = [];
    };

    $rootScope.$on('panel:close', function() {
      closePanels();
    });

    $scope.hide = function(panel){
      switch(panel){
        case 'propertyPanel':
          break;
        case 'landlordPanel':
          break;
        default:
          break;
      }
    };
  });

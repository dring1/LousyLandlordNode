'use strict';
/*jshint camelcase: false */

angular.module('LousyLandlordMobileApp')
  .controller('FormController', function($scope, $rootScope, $ionicPopup, propertyService) {
    $scope.newProperty = {
      name: '',
      org: '',
      location: ''
    };

    $scope.frame = false;

    $scope.lock = false;

    $scope.errors = [];

    function validate(property) {


      if (/\b[A-Z]+.+[?^ ][A-Z].{1,19}|\b[A-Z]+.+[?^,][A-Z].{1,19}/.test(property.name) === false) {
        $scope.errors.push('Invalid name. Format like `John Smith`');
      }

      property.organization = property.organization || 'None';

      if (property.comment === undefined || property.comment.length < 6 || property.comment.lenght > 140) {
        $scope.errors.push('Invalid comment. Comments must be more than 6 characts and less than 140.');
      }


      if ($scope.errors.length > 0) {
        var alertPopup = $ionicPopup.alert({
          title: 'Invalid Format',
          template: '<ul> <li ng-repeat="error in errors"> <strong>{{error}}</strong>  </li> </ul>',
          scope: $scope
        });
        alertPopup.then(function() {
          $scope.errors = [];
        });

        return false;
      }

      return true;
    }

    function success() {
      var alertPopup = $ionicPopup.alert({
        title: 'Thank You for submitting a landlord!',
        scope: $scope
      });
      alertPopup.then(function() {
        $scope.frame = false;
      });
    }

    function fail() {
      $ionicPopup.alert({
        title: 'Something went wrong on our side :( Please try again later!'
      });
    }

    $rootScope.$on('addProperty', function(event, property) {

      $scope.newProperty.location = property.formatted_address;
      $scope.frame = true;
    });

    $scope.submit = function() {
      if (!validate($scope.newProperty)) {
        return;
      }
      if (!$scope.lock) {
        $scope.lock = true;
        propertyService.submitProperty($scope.newProperty)
          .then(function(data) {
            console.log('submitted data', data);
            success();
            $scope.lock = false;
            $rootScope.$broadcast('property:update', data.property);
            reset();
          })
          .catch(function(err) {
            console.log(err);
            $scope.lock = false;
            fail();
          });
      }
    };

    function reset() {
      $scope.newProperty = {};
    }

    $scope.cancel = function() {
      reset();
      $scope.frame = false;
    };

    $rootScope.$on('close', function() {
      $scope.frame = false;
      reset();
    });
  });

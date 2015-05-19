'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('FormCtrl', function($rootScope, $scope, landlordService, propertyService, $modal) {

    $scope.activeForm = false;
    $scope.location = {};
    $scope.place = {};
    $scope.addrErr = false;
    $scope.addLandlordDisabled = true;

    $rootScope.$on('property:selected', function(event, place) {
      console.log(place);
      $scope.addLandlordDisabled = false;
      $scope.place = place;
    });

    $scope.schema = {
      type: 'object',
      properties: {
        location: {
          type: 'object',
          properties: {
            address: {
              type: 'string',
              title: 'Street',
              minLength: 2,
              placeholder: '123 Fake St'
            },
            unit: {
              type: 'string',
              title: 'Unit | Apt',
              minLength: 1,
              maxLength: 6
            },
            city: {
              type: 'string',
              title: 'City',
              minLength: 3,
              maxLength: 60,
              required: true,
              pattern: /^[A-Za-z]/
            },
            province: {
              type: 'string',
              title: 'Province',
              minLength: 2,
              maxLength: 60,
              required: true
            },
            postal: {
              type: 'string',
              title: 'Postal Code',
              minLength: 6,
              maxLength: 6,
              pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
            }
          },
          required: ['address', 'unit', 'city', 'province', 'postal']
        },
        name: {
          type: 'string',
          minLength: 5,
          maxLength: 39,
          title: 'Landlord Name',
          required: true,
          pattern: /\b[A-Z]+.+[?^ ][A-Z].{1,19}|\b[A-Z]+.+[?^,][A-Z].{1,19}/,
          placeholder: 'John Smith',
          validationMessage: {
            'default': 'Please enter a valid name.'
          }
        },
        organization: {
          type: 'string',
          minLength: 2,
          maxLength: 150,
          title: 'Organization',
          //pattern: /^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/
        },
        comment: {
          type: 'string',
          title: 'Comment',
          minLength: 6,
          maxLength: 140
        }
      },
      required: [
      'name',
      'location'
      ]
    };


    $scope.form = [
      'name',
      // 'location',
      'organization',
      {
        'key': 'comment',
        'type': 'textarea',
        'placeholder': 'Leave a comment'
      },
    {
      type: 'submit',
      title: 'Submit'
    }
    ];

    $scope.newLandlord = {};
    $scope.toggleForm = function() {
      $scope.activeForm = !$scope.activeForm;
    };

    $scope.cancel = function() {
      $scope.form = {};
    };

    $scope.submit = function(form) {
      $scope.$broadcast('schemaFormValidate');
      if(!form.$valid){
        return;
      }
      if( _.isEmpty($scope.place) || $scope.place.formatted_address === undefined){
        $scope.open({title: 'Invalid Address', message: 'We rely on Google Maps to find the address, and Google is unable to find it.'});
        return;
      }
      
      $scope.newLandlord.latitude = $scope.place.geometry.location.A;
      $scope.newLandlord.longitude = $scope.place.geometry.location.F;
      $scope.newLandlord.location = $scope.place.formatted_address;
      console.log($scope.place.formatted_address);
      console.log($scope.newLandlord);
      propertyService.submitProperty($scope.newLandlord)
      .then(function(data) {
        $scope.newLandlord = {};
        $scope.activeForm = false;
        form.$setPristine();
        $scope.open({title: 'Success', message: 'Thank you for submitting a landlord'});
        $rootScope.$broadcast('property:update', data.property);
        $rootScope.$broadcast('property:create');
      })
      .catch(function(err) {
        $scope.err = err;
        $scope.open({title: 'Something went wrong', message: err});
        $scope.error = true;
      });
    };

    $scope.open = function (msg) {
      $scope.activeForm = false;
      $rootScope.$broadcast('modal:open');
      var modalInstance = $modal.open({
        templateUrl: 'formSubmission.html',
        controller: 'ModalFormCtrl',
        resolve: {
          result: function() {
            return msg;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
        $rootScope.$broadcast('modal:close');
      });
    };

    $scope.error = false;
  });


angular.module('lousyLandLordSpaApp').controller('ModalFormCtrl', function ($scope, $modalInstance, result) {
    console.log(result);
    $scope.result = result;

    $scope.ok = function close () {
      $modalInstance.close();
    };
  });

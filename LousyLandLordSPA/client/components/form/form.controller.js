'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('FormCtrl', function($scope, landlordService, propertyService) {

    $scope.activeForm = false;

    $scope.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 2,
          title: 'Name',
          placeholder: 'John Smith',
          required: true
        },
        address: {
          type: 'string',
          title: 'Street',
          minLength: 2,
          placeholder: '123 Fake St'
        },
        postal: {
          type: 'string',
          title: 'Postal Code',
          minLength: 6,
          maxLength: 6,
          placeholder: 'K1S3T8(No space)'
        },
        unit: {
          type: 'string',
          title: 'Unit | Apt',
          minLength: 1,
          maxLength: 6
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
      'address',
      'postal',
      'unit'
      ]
    };


    // style inline for buttons
    $scope.form = [
      'name',
      'address',
      'postal',
      'unit', {
        'key': 'comment',
        'type': 'textarea',
        'placeholder': 'Make a comment'
      }, {
        type: 'actions',
        items: [{
          type: 'button',
          style: 'btn-success ctrl-btn',
          title: 'Submit',
          onClick: 'submit()'
        }, {
          type: 'button',
          style: 'btn-info',
          title: 'Cancel',
          onClick: 'cancel()'
        }]
      }
    ];

    $scope.newLandlord = {};
    $scope.toggleForm = function() {
      $scope.activeForm = !$scope.activeForm;
    };

    $scope.cancel = function() {
      console.log($scope.newLandlord);
    };

    $scope.submit = function() {
      $scope.$broadcast('schemaFormValidate');
      console.log($scope.newLandlord);
      propertyService.submitProperty($scope.newLandlord)
      .then(function(landlord) {
        // body...
      })
      .catch(function(err) {
        console.log('err', err);
        $scope.error = true;
      });
    };

    $scope.error = false;
  });

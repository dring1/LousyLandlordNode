'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('FormCtrl', function($scope, landlordService) {

    $scope.activeForm = false;

    $scope.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 2,
          title: 'Name',
          placeholder: 'John Smith'
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
      }
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
          type: 'submit',
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
      console.log($scope.newLandlord);
    };


  });

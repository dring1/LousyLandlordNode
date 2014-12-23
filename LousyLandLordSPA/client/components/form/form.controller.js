'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('FormCtrl', function($scope) {

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
          minLength: 6,
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
    'unit',
      {
        'key': 'comment',
        'type': 'textarea',
        'placeholder': 'Make a comment'
      }, {
        type: 'button',
        title: 'Submit',
        onClick: 'submit()',
        style: 'ctrl-btn btn btn-success'
      }, {
        type: 'button',
        title: 'Confirm',
        style: 'ctrl-btn btn btn-warning'
      }, {
        type: 'button',
        title: 'Cancel',
        style: 'ctrl-btn btn btn-danger'
      }

    ];

    $scope.model = {};
    $scope.toggleForm = function() {
      $scope.activeForm = !$scope.activeForm;
    };


  });

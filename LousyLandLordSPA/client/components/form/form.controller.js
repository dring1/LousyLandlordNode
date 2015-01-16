'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('FormCtrl', function($scope, landlordService, propertyService, $modal, $log) {

    $scope.activeForm = false;

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
              required: true
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
              placeholder: 'K1S3T8(No space)'
            }
          },
          required: ['address', 'unit', 'city', 'province', 'postal']
        },
        name: {
          type: 'string',
          minLength: 2,
          maxLength: 120,
          title: 'Landlord Name',
          required: true
        },
        organization: {
          type: 'string',
          minLength: 2,
          maxLength: 150,
          title: 'Organization'
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


    // style inline for buttons
    $scope.form = [
      'name',
      'location',
      'organization',{
        'key': 'comment',
        'type': 'textarea',
        'placeholder': 'Make a comment'
      },
      // {
      //   type: 'actions',
      //   items: [{
      //     type: 'button',
      //     style: 'btn-success ctrl-btn',
      //     title: 'Submit',
      //     onClick: 'submit(form)'
      //   }, {
      //     type: 'button',
      //     style: 'btn-info',
      //     title: 'Cancel',
      //     onClick: 'cancel()'
      //   }]
      // },
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
      propertyService.submitProperty($scope.newLandlord)
      .then(function(data) {
        $scope.newLandlord = {};
        $scope.activeForm = false;
        form.$setPristine();
        $scope.open();
      })
      .catch(function(err) {
        console.log('err', err);
        $scope.error = true;
      });
    };

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'formSubmission.html',
        controller: 'ModalFormCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        console.log('closed', selectedItem);
        $scope.selected = selectedItem;

        // restangular post to comments
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.error = false;
  });


angular.module('lousyLandLordSpaApp').controller('ModalFormCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.contact = {
      selected: '',
      text: ''
    };


    $scope.ok = function () {
      console.log($scope.contact);
      $modalInstance.close($scope.contact);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

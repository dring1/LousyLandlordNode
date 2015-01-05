'use strict';


angular.module('lousyLandLordSpaApp').controller('ContactCtrl', function ($scope, $modal, $log) {

  $scope.items = ['Comment', 'Concern', 'Wrongful Accusation'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'contact.html',
      controller: 'ModalContactCtrl',
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
});

angular.module('lousyLandLordSpaApp').controller('ModalContactCtrl', function ($scope, $modalInstance, items) {

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

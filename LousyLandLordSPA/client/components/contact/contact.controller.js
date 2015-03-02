'use strict';


angular.module('lousyLandLordSpaApp').controller('ContactCtrl', function ($rootScope, $scope, $modal, $log, $http, configService) {

  $scope.items = ['Comment', 'Concern', 'Wrongful Accusation'];

  $scope.open = function (size) {
    $rootScope.$broadcast('modal:open');
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

    modalInstance.result.then(function (comment) {
      $http.post(configService.getBaseURL() + 'comments', comment)
      .then(function() {
        console.log('submitted');
      })
      .catch(function(err) {
        console.log(err);
      });
    }, function () {
      $rootScope.$broadcast('modal:close');
    });
  };
});

angular.module('lousyLandLordSpaApp').controller('ModalContactCtrl', function ($rootScope, $scope, $modalInstance, items) {

  $scope.items = items;
  $scope.contact = {
    selected: '',
    text: ''
  };


  $scope.ok = function () {

    $modalInstance.close($scope.contact);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

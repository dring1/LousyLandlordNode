'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('AboutCtrl', function($rootScope, $scope, $modal) {
    $scope.frame = false;



    $scope.open = function(size) {
      $rootScope.$broadcast('modal:open');
      var modalInstance = $modal.open({
        templateUrl: 'about.html',
        controller: 'ModalAboutCtrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function() {}, function() {
        $rootScope.$broadcast('modal:close');
      });
    };
  });

angular.module('lousyLandLordSpaApp').controller('ModalAboutCtrl', function($scope, $modalInstance) {
  $scope.ok = function() {
    $modalInstance.dismiss('cancel');
  };
});

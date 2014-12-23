'use strict';

angular.module('lousyLandLordSpaApp')
.controller('InfoCtrl', function ($scope) {

  $scope.$on('landlord:selected', function(e, landlord) {
    console.log(landlord);
  });

});

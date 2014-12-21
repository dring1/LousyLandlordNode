'use strict';

angular.module('lousyLandLordSpaApp')
.controller('FormCtrl', function ($scope) {

  $scope.activeForm = false;

  $scope.schema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, title: 'Name', description: 'Name or alias' },
      title: {
        type: 'string',
        enum: ['dr','jr','sir','mrs','mr','NaN','dj']
      }
    }
  };

  $scope.newForm = function() {
    $scope.activeForm = true;
  };


});

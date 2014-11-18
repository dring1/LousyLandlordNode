'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('PropertiesCtrl', function ($scope, Restangular) {
    Restangular.all('properties').getList();
    console.log('magic');
  });

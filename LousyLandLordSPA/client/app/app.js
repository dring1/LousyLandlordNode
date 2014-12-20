'use strict';

angular.module('lousyLandLordSpaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'google.places',
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9015/api');
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

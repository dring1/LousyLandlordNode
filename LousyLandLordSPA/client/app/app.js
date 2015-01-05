'use strict';

angular.module('lousyLandLordSpaApp', [
  'ngCookies',
  'ngResource',
  'ui.select',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'google.places',
  'schemaForm',
  'stripe',
  'angularModalService',
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9015');
    $urlRouterProvider
      .otherwise('/home');

    $locationProvider.html5Mode(true);
  });

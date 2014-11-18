'use strict';

angular.module('lousyLandLordSpaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'google-maps'.ns(),
  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9015/');
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
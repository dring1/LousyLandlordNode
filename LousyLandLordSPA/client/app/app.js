'use strict';

angular.module('lousyLandLordSpaApp', [
  'ngResource',
  'ui.select',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'google.places',
  'schemaForm',
  'angularModalService',
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/home');
    //  set up api end point
    $locationProvider.html5Mode(true);
  });

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
  'angularModalService',
  'ngCookies'

])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/home');

    $locationProvider.html5Mode(true);
  });

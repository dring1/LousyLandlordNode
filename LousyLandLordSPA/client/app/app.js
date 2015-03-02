'use strict';

angular.module('lousyLandLordSpaApp', [
    'ui.select',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'uiGmapgoogle-maps',
    'google.places',
    'schemaForm',
    'angularModalService',
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
  })
  .run(function(configService) {
    var location = window.location;
    var url = (location.hostname.indexOf('lousylandlord') > -1) ? 'http://api.lousylandlord.ca/' : 'http://localhost:9015/'
    configService.setBaseURL(url);
  })

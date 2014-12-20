'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('config', function () {
    var baseURL = 'http://localhost:9104/'

    return {
      getBaseURL: function () {
        return baseURL;
      }
    };
  });

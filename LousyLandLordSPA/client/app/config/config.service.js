'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('config', function () {
    var baseURL = 'http://localhost:9015/';

    return {
      getBaseURL: function () {
        return baseURL;
      }
    };
  });

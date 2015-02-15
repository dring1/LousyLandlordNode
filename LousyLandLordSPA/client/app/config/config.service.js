'use strict';

angular.module('lousyLandLordSpaApp')
  .factory('config', function () {
    var apiURL = 'http://localhost:9015/';

    return {
      getBaseURL: function () {
        return apiURL;
      },
      setBaseURL: function(url) {
        apiURL = url;
      }
    };
  });

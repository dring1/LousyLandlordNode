'use strict';

angular.module('LousyLandlordMobileApp')
.factory('config', function () {
  var baseURL = 'http://localhost:9015/';

  return {
    getBaseURL: function () {
      return baseURL;
    }
  };
});

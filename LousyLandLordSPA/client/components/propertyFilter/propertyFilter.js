'use strict';

angular.module('lousyLandLordSpaApp')
.filter('propertyFilter', function() {
  return function(location) {
    return [location.address, location.city, location.province].join(', ');
  };
});

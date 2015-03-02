// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('LousyLandlordMobileApp', [
'ionic',
'google.places',
'uiGmapgoogle-maps',
'ngTouch',
'geolocation'
])

.run(function($ionicPlatform, config) {

  var location = window.location;
  var url = (location.hostname.indexOf('lousylandlord') > -1) ? 'http://api.lousylandlord.ca/' : 'http://localhost:9015/'
  config.setBaseURL(url);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

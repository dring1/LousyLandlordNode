'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('MapCtrl', function($rootScope, $scope, uiGmapGoogleMapApi, landlordService) {

    var googleMaps;

    $scope.cities = [
    {

        id: 'TESTID',
        idKey: 'LANDLORD',
        title: 'I am a shitty landlord',
        latitude: 45.4248,
        longitude: -75.6992

    }
    ];

    $scope.map = {
      control: {},
      zoom: 9,
      center: {
        latitude: 45.4248,
        longitude: -75.6992
      },
      options: {
        streetViewControl: true,
        panControl: true,
        maxZoom: 20,
        minZoom: 3,
        styles: [{
          "featureType": "administrative.country",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.province",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "poi",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "transit",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "visibility": "on"
          }]
        }, {
          "featureType": "landscape",
          "stylers": [{
            "visibility": "simplified"
          }]
        }, ]
      },
      clusterOptions: {
        averageCenter: true,
        maxZoom: 10
      },
      // events: {
      //   tilesloaded: function (map) {}
      // },
    };

    $scope.showWeather = false;

    $scope.markersEvents = {
      click: function (gMarker, eventName, model) {
        console.log(model);
        if(model.$id){
          model = model.coords;//use scope portion then
        }
        $rootScope.$broadcast('landlord:select', model);
      }
    };

    uiGmapGoogleMapApi.then(function(maps) {
      googleMaps = maps;
      // $scope.map.options.zoomControlOptions = {
      //   position: googleMaps.ControlPosition.TOP_RIGHT
      // };
      $scope.map.options.mapTypeId = googleMaps.MapTypeId.HYBRID;
    });

  });

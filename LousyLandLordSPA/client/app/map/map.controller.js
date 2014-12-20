'use strict';

angular.module('lousyLandLordSpaApp')
  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi) {

    var googleMaps;

    $scope.cities = [
    {

        id: 'pepepw',
        idKey: 'qweqe',
        titile: 'asdada',
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

    uiGmapGoogleMapApi.then(function(maps) {
      googleMaps = maps;
      // $scope.map.options.zoomControlOptions = {
      //   position: googleMaps.ControlPosition.TOP_RIGHT
      // };
      $scope.map.options.mapTypeId = googleMaps.MapTypeId.HYBRID;
    });

  });

  'use strict';

  angular.module('lousyLandLordSpaApp')
    .controller('MapCtrl', function($rootScope, $scope, uiGmapGoogleMapApi, landlordService, propertyService) {

      var googleMaps;

      $scope.cities = [];

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
            'featureType': 'administrative.country',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'administrative.province',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'poi',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'transit',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{
              'visibility': 'on'
            }]
          }, {
            'featureType': 'landscape',
            'stylers': [{
              'visibility': 'simplified'
            }]
          }, ]
        },
        clusterOptions: {
          averageCenter: true,
          maxZoom: 18
        },
        // events: {
        //   tilesloaded: function (map) {}
        // },
      };

      $scope.showWeather = false;

      $scope.markersEvents = {
        click: function(gMarker, eventName, model) {
          if (model.$id) {
            model = model.coords; //use scope portion then
          }
          $rootScope.$broadcast('property:select', model);
        }
      };

      uiGmapGoogleMapApi.then(function(maps) {
        googleMaps = maps;
        // $scope.map.options.zoomControlOptions = {
        //   position: googleMaps.ControlPosition.TOP_RIGHT
        // };

        // map ready broadcast load landlords
        $scope.map.options.mapTypeId = googleMaps.MapTypeId.HYBRID;
        $rootScope.$broadcast('map:ready');

        //service call should return promise
        //fetch properties and return in nice format
        propertyService.getProperties().then(function(data) {
          angular.forEach(data, buildPropertyMarker);
        });
      });


      $scope.$on('map:zoom', function(event, loc) {
        $scope.map.center.latitude = loc.lat;
        $scope.map.center.longitude = loc.lng;
        $scope.map.zoom = 18;
      });

      function buildPropertyMarker(property) {
        var marker = {
          id: property.id,
          idKey: property.location.address,
          latitude: property.latitude,
          longitude: property.longitude,
          property: property
        };
        $scope.cities.push(marker);
      }
    });

  'use strict';

  angular.module('lousyLandLordSpaApp')
    .controller('MapCtrl', function($rootScope, $scope, uiGmapGoogleMapApi, landlordService, propertyService) {

      var googleMaps;

      $scope.properties = [];

      $scope.map = {
        control: {},
        zoom: 9,
        center: {
          latitude: 45.4248,
          longitude: -75.6992
        },
        options: {
          streetViewControl: true,
          mapTypeControl: false,
          mapTypeControlOptions: false,
          maxZoom: 20,
          minZoom: 3,
          styles: [{
            'featureType': 'administrative.country',
            'stylers': [{
              'visibility': 'on'
            }]
          }, {
            'featureType': 'administrative.province',
            'stylers': [{
              'visibility': 'on'
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
        $scope.map.options.mapTypeId = googleMaps.MapTypeId.ROADMAP;
        $rootScope.$broadcast('map:ready');

        //service call should return promise
        //fetch properties and return in nice format
        // propertyService.getProperties().then(function(data) {
        //   angular.forEach(data, buildPropertyMarker);
        // });
        populateMap();
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
        $scope.properties.push(marker);
      }

      function populateMap() {
        propertyService.getProperties().then(function(data) {
          //console.log(data);
          angular.forEach(data, buildPropertyMarker);
        });
      }

      $rootScope.$on('properties:update', function() {
        $scope.properties = [];
        populateMap();
      });

      $rootScope.$on('property:update', function(event, property) {
        console.log(property);
        buildPropertyMarker(property);
      });
    });

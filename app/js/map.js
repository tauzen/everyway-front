'use strict';

/* globals google, GeolocationMarker */

/**
 * Created by ppaw on 2015-06-13.
 */

var $ = require('jquery');
// GeolocationMarker import
require('../../bower_components/geolocation-marker/dist/geolocationmarker-compiled.js');
var GeoLocation = require('./geolocation-helper');

(function(exports) {
  var geocoder = new google.maps.Geocoder();

  var startLat = 52.4023366862351;
  var startLng = 16.925666755676275;

  var initialLocation = null;

  var map;
  var markers = [];
  var browserSupportFlag = false;

  var follow = true;

  var markerIconPrefix = 'static/img/markers/';

  var markerIconMap = {
    "low-curb":"przyjaznykraweznik.png",
    "high-curb":"wysokikraweznik.png",
    "stairs":"schody.png",
    "elevator":"winda.png",
    "elevator-platform":"podnosnik.png",
    "cobbles":"nierownosci.png",
    "foot-bridge":"przejscienadziemne.png",
    "ramp":"pochylnia.png",
    "slope":"pochylosc.png"
  };

  var currentMarker;

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setAllMap(null);
  }

  function addMarkerToMap(markerOptions, draggable) {
    var latLng = new google.maps.LatLng(markerOptions.lat, markerOptions.lng);

    var iconPath = null;
    var image = null;
    if (markerIconMap[markerOptions.kind]) {
      iconPath = markerIconPrefix + markerIconMap[markerOptions.kind]
      image = {
          url: iconPath
      };
    }

    var marker = new google.maps.Marker({
      position: latLng,
      title: markerOptions.kind,
      map: map,
      icon: image,
      draggable: draggable,
      animation: google.maps.Animation.DROP,
      customInfo: markerOptions
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function(e) {
      currentMarker = marker;
      markerSelected(marker.customInfo);
      map.setZoom(19);
      map.panTo(marker.getPosition());
      map.panBy(0, window.innerHeight / 4);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 750);
    });

    google.maps.event.addListener(marker, 'dragend', function() {
      updateMarker(marker);
    });

    return marker;
  }

  function addMarkersToMap(markersOptions) {
    for (var i in markersOptions) {
      addMarkerToMap(markersOptions[i], false);
    }
  }

  function newMarker(markerOptions) {
    var defaultMarkerOptions = {
      lat: initialLocation.lat(),
      lng: initialLocation.lng(),
      state: 'ok'
    };

    var marker = $.extend(defaultMarkerOptions, markerOptions);
    return addMarkerToMap(marker, true);
  }

  function updateMarker(marker) {
    var m = marker.customInfo;

    m.lat = marker.getPosition().lat();
    m.lng = marker.getPosition().lng();
    markerMoved(m);
  }

  function deleteMarker(marker) {
    var mapMarker = markers.find(function(m) {
      return marker.id === m.customInfo.id;
    });

    if(mapMarker) {
      mapMarker.setMap(null);
    }
  }

  function refresh(markers) {
    clearMarkers();
    addMarkersToMap(markers);
  }

  function init() {
    /*initialLocation = new google.maps.LatLng(startLat, startLng);
    map = new google.maps.Map(document.getElementById('main-map'), {
      zoom: 19,
      center: initialLocation,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true
    });

    var GeoMarker = new GeolocationMarker(map);

    GeoMarker.setCircleOptions({
      visible: false
    });

    GeoMarker.setMarkerOptions({
      zIndex: 999
    });

    GeoLocation.getPosition(true).then((pos) => {
      initialLocation = new google.maps.LatLng(pos.lat, pos.lng);
      map.setCenter(initialLocation);
    }).catch((err) => {
      console.error(err);
    });*/
  }

  var markerMoved = function(marker) {
    console.log('Marker moved', marker);
  };

  var setMarkerMovedHandler = function(cb) {
    markerMoved = cb;
  };

  var markerSelected = function(marker) {
    console.log('Marker selected', marker);
  };

  var setMarkerSelectedHandler = function(cb) {
    markerSelected = cb;
  };

  exports.Map = {
    init: init,
    drawMarkers: refresh,
    createMarker: newMarker,
    removeMarker: deleteMarker,
    redrawMarker: function(m) { console.log('TODO redraw', m); },
    setMarkerMovedHandler: setMarkerMovedHandler,
    setMarkerSelectedHandler: setMarkerSelectedHandler,
  };

})((typeof exports === 'undefined') ? window : exports);

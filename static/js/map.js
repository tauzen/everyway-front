'use strict';

/* globals google, $, UI, GeolocationMarker, API */

/**
 * Created by ppaw on 2015-06-13.
 */
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

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

function addMarkerToMap(markerOptions) {
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
        draggable: true,
        customInfo: markerOptions
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function(e) {
        currentMarker = marker;

        UI.showDetails(marker.customInfo);
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarker(marker);
    });
}

function getMarkers(bounds) {
    API.getMarkers(bounds, addMarkersToMap.bind(this));
}

function addMarkersToMap(markersOptions) {
    for (var i in markersOptions) {
        addMarkerToMap(markersOptions[i]);
    }
}

function newMarker(markerOptions) {
    var defaultMarkerOptions = {
        lat: initialLocation.lat(),
        lng: initialLocation.lng(),
        state: 'ok'
    };

    markerOptions = $.extend(defaultMarkerOptions, markerOptions);
    API.addMarker(markerOptions, refresh.bind(this));
}

function updateMarker(marker) {
    var m = marker.customInfo;

    m.lat = marker.getPosition().lat();
    m.lng = marker.getPosition().lng();
    API.updateMarker(m, refresh.bind(this));
}

function deleteMarker(marker) {
    var m = marker.customInfo || marker;
    API.deleteMarker(m, refresh.bind(this));
}

function refresh() {
    clearMarkers();
    var m = getMarkers();
    addMarkersToMap(m);
}

$(function() {
    initialLocation = new google.maps.LatLng(startLat, startLng);
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

    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag === true) {
            alert('Geolocation service failed.');
        } else {
            alert('Your browser doesn\'t support geolocation. We\'ve placed you in Siberia.');
        }
    }

    refresh();

    UI.setAddMarkerHandler(newMarker);
    UI.setDeleteMarkerHandler(deleteMarker);
    UI.setUpvoteMarkerHandler(function(marker) {
        marker.votes = (marker.votes) ? marker.votes + 1 : 1;
        API.updateMarker(marker);
        UI.showDetails(marker);
    });
    UI.setFailureMarkerHandler(function(marker) {
        marker.state = 'failure';
        API.updateMarker(marker);
        UI.showDetails(marker);
    });
});

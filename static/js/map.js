/**
 * Created by ppaw on 2015-06-13.
 */
var geocoder = new google.maps.Geocoder();

var startLat = 52.4023366862351;
var startLng = 16.925666755676275;

var map;
var markers = [];

var follow = true;


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

function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
    document.getElementById('info').innerHTML = [
        latLng.lat(),
        latLng.lng()
    ].join(', ');
}

function updateMarkerAddress(str) {
    document.getElementById('address').innerHTML = str;
}

function addMarkerToMap(markerOptions) {
    var latLng = new google.maps.LatLng(markerOptions.lat, markerOptions.lng);

    var marker = new google.maps.Marker({
        position: latLng,
        title: markerOptions.name,
        map: map,
        draggable: true
    });

    markers.push(marker);

    // Add dragging event listeners.
    google.maps.event.addListener(marker, 'dragstart', function() {
        updateMarkerAddress('Dragging...');
    });

    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerStatus('Dragging...');
        updateMarkerPosition(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'click', function() {
        updateMarkerStatus('Click');
        updateMarkerPosition(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('Drag ended');
        geocodePosition(marker.getPosition());
    });
}

function getMarkers(bounds) {
    var markers = [
        {
            lat: 52.4023366862351,
            lng: 16.925666755676275,
            name: 'A',
            desc: 'Qwe',
            type: 1
        },
        {
            lat: 52.40272943253274,
            lng: 16.926235383987432,
            name: 'B',
            desc: 'Qwe2',
            type: 1
        }
    ]

    return markers;
}

function addMarkersToMap(markersOptions) {
    for (i in markersOptions) {
        addMarkerToMap(markersOptions[i])
    }
}

$(function() {
    // Update current position info.
    //updateMarkerPosition(latLng);
    //geocodePosition(latLng);
    var startCenter = new google.maps.LatLng(startLat, startLng);
    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 17,
        center: startCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        //scaleControl: true
        zoomControl: true
    });

    var GeoMarker = new GeolocationMarker(map);

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
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
    }


    google.maps.event.addListener(map, 'bounds_changed', function(e) {
        updateMarkerStatus('Map changed');
        updateMarkerPosition(map.getBounds().getNorthEast());

        clearMarkers()
        var m = getMarkers()
        addMarkersToMap(m)
    });

    $('#add-marker').on('click', function(e) {
        e.preventDefault();

        var markerOptions = {
            lat: map.getCenter().lat(),
            lng: map.getCenter().lng(),
            name: 'Nowy',
            desc: 'Qwe',
            type: 1
        }

        addMarkerToMap(markerOptions);

        return false;
    });
})
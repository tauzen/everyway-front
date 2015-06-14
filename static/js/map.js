/**
 * Created by ppaw on 2015-06-13.
 */
var geocoder = new google.maps.Geocoder();

var startLat = 52.4023366862351;
var startLng = 16.925666755676275;

var map;
var markers = [];

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

    if (markerIconMap[markerOptions.kind] === undefined) {
        var iconPath = null;
        var image = null;
    } else {
        var iconPath = markerIconPrefix + markerIconMap[markerOptions.kind]

        var image = {
            url: iconPath
            // This marker is 20 pixels wide by 32 pixels tall.
            //scaledSize: new google.maps.Size(20, 32),
            // The origin for this image is 0,0.
            //origin: new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
            //anchor: new google.maps.Point(0, 32)
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


    // Add dragging event listeners.
    google.maps.event.addListener(marker, 'dragstart', function() {
        updateMarkerAddress('Dragging...');
    });

    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerStatus('Dragging...');
        updateMarkerPosition(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'click', function(e) {
        updateMarkerStatus('Click');
        updateMarkerPosition(marker.getPosition());

        currentMarker = marker;

        var $md = $('#marker-details');

        $md.children().remove();

        for (var key in marker.customInfo) {
            //if (marker.hasOwnProperty(key)) {
                $md.append('<dt>' + key + '</dt><dd>' + marker.customInfo[key] + '</dd>');
            //}
        }

        console.log(marker.title)
        console.log(e)

    });

    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('Drag ended');
        geocodePosition(marker.getPosition());

        updateMarker(marker);
    });
}

function getMarkers(bounds) {
    $.ajax({
        url: 'http://everyway.herokuapp.com/marks.json',
        success: function(data) {
            addMarkersToMap(data)
        }
    });
}

function addMarkersToMap(markersOptions) {
    for (i in markersOptions) {
        addMarkerToMap(markersOptions[i])
    }
}

function addMarker(marker) {
    $.ajax({
        url: 'http://everyway.herokuapp.com/marks',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(marker),
        success: function() {
            refresh();
        },
        error: function(e, textStatus, errorThrown) {
            console.log(e)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

function updateMarker(marker) {
    var m = marker.customInfo;

    m.lat = marker.getPosition().lat();
    m.lng = marker.getPosition().lng();

    $.ajax({
        url: 'http://everyway.herokuapp.com/marks/' + m.id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(m),
        success: function() {
            refresh();
        },
        error: function(e, textStatus, errorThrown) {
            console.log(e)
            console.log(textStatus)
            console.log(errorThrown)
        }
    })
}

function deleteMarker(marker) {
    var m = marker.customInfo;

    $.ajax({
        url: 'http://everyway.herokuapp.com/marks/' + m.id,
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(m),
        success: function() {
            refresh();
        }
    })
}

function refresh() {
    clearMarkers()
    var m = getMarkers()
    addMarkersToMap(m)
}

$(function() {
    // Update current position info.
    //updateMarkerPosition(latLng);
    //geocodePosition(latLng);
    var startCenter = new google.maps.LatLng(startLat, startLng);
    map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 19,
        center: startCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        //scaleControl: true
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
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
            initialLocation = siberia;
        }
        map.setCenter(initialLocation);
    }

    refresh();

    google.maps.event.addListener(map, 'bounds_changed', function(e) {
        updateMarkerStatus('Map changed');
        updateMarkerPosition(map.getBounds().getNorthEast());
    });

    $('#add-marker').on('click', function(e) {
        e.preventDefault();

        var latLng;

        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                var markerOptions = {
                    lat: new String(latLng.lat()),
                    lng: new String(latLng.lng()),
                    category: "test",
                    kind: "test",
                    state: "ok"
                }

                addMarker(markerOptions)
            });
        } else {
            latLng = map.getCenter();

            var markerOptions = {
                lat: new String(latLng.lat()),
                lng: new String(latLng.lng()),
                category: "test",
                kind: "test",
                state: "ok"
            }

            addMarker(markerOptions)
        }
    });

    $('#delete-marker').on('click', function(e) {
        e.preventDefault();

        deleteMarker(currentMarker);
    });
})
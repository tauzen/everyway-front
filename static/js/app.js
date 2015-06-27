'use strict';

/* global UI, API, Map */

// Markers are currently stored in an array in Map module
// and the data retrieved from API calls is stored in customInfo
// property of each marker. Once a marker is clicked, customInfo property is
// passed into the UI and stored. UI actions handlers are implemented below,
// they revceive the customInfo object as parameter and can modify it
// here if needed and notify any changes to the API or MAP objects.

window.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem('debug') === 'enabled') {
    UI.enableDebug();
  }

  Map.init();
  API.getMarkers(null, function(markers) {
    Map.drawMarkers(markers);
  });

  var addMarker = function(markerOptions) {
    var marker = Map.createMarker(markerOptions);
    API.addMarker(marker.customInfo, function(savedMarker) {
      marker.customInfo.id = savedMarker.id;
    });
  };

  var deleteMarker = function(marker) {
    API.deleteMarker(marker, function() {
      Map.removeMarker(marker);
    });
  };

  var upvoteMarker = function(marker) {
    marker.votes = (marker.votes) ? marker.votes + 1 : 1;
    API.updateMarker(marker);
    UI.showDetails(marker);
  };

  var markerFailure = function(marker) {
    marker.state = 'failure';
    API.updateMarker(marker, function() {
      UI.showDetails(marker);
      Map.redrawMarker(marker);
    });
  };

  UI.setAddMarkerHandler(addMarker.bind(this));
  UI.setDeleteMarkerHandler(deleteMarker.bind(this));
  UI.setUpvoteMarkerHandler(upvoteMarker.bind(this));
  UI.setFailureMarkerHandler(markerFailure.bind(this));

  var markerMoved = function(marker) {
    API.updateMarker(marker);
  };

  var markerSelected = function(marker) {
    UI.showDetails(marker);
  };

  Map.setMarkerMovedHandler(markerMoved.bind(this));
  Map.setMarkerSelectedHandler(markerSelected.bind(this));
});

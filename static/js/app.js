'use strict';

/* global UI, API, Map */

window.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem('debug') === 'enabled') {
    UI.enableDebug();
  }

  Map.init();
  API.getMarkers(null, function(markers) {
    Map.drawMarkers(markers);
  });

  UI.setAddMarkerHandler(function(markerOptions) {
    var marker = Map.createMarker(markerOptions);
    API.addMarker(marker.customInfo, function(savedMarker) {
      marker.customInfo.id = savedMarker.id;
    });
  });
});

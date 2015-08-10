'use strict';

// Markers are currently stored in an array in GMap module
// and the data retrieved from API calls is stored in customInfo
// property of each marker. Once a marker is clicked, customInfo property is
// passed into the UI and stored. UI actions handlers are implemented below,
// they revceive the customInfo object as parameter and can modify it
// here if needed and notify any changes to the API or MAP objects.

require('babelify/polyfill');

var ReactUI = require('./components/ui.react');
//ReactUI.renderUI('easy-city-app');
var GeoLocation = require('./geolocation-helper');
GeoLocation.getPosition();

var API = require('./apiclient.js').API;
var UI = require('./ui').UI;
var GMap = require('./map').Map;
var FbUser = require('./fblogin').FbUser;

window.addEventListener('DOMContentLoaded', function() {

  if(localStorage.getItem('debug') === 'enabled') {
    UI.enableDebug();
  }

  var addMarker = function(markerOptions) {
    var marker = GMap.createMarker(markerOptions);
    API.addMarker(marker.customInfo, function(savedMarker) {
      marker.customInfo.id = savedMarker.id;
    });
  };

  var deleteMarker = function(marker) {
    API.deleteMarker(marker, function() {
      GMap.removeMarker(marker);
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
      GMap.redrawMarker(marker);
    });
  };

  var onFbLogin = function(user) {
    if(user.userID) {
      UI.userLoggedIn();
      API.updateAuthToken(user.authToken);
    }
  };

  var fbLoginRequested = function() {
    FbUser.checkLoginStatus(function(user) {
      if(user.userID) {
        onFbLogin(user);
        return;
      }

      FbUser.loginUser(function(_user) {
        onFbLogin(_user);
      });
    });
  };

  UI.setAddMarkerHandler(addMarker);
  UI.setDeleteMarkerHandler(deleteMarker);
  UI.setUpvoteMarkerHandler(upvoteMarker);
  UI.setFailureMarkerHandler(markerFailure);
  UI.setFbLoginRequestHandler(fbLoginRequested);

  var markerMoved = function(marker) {
    API.updateMarker(marker);
  };

  var markerSelected = function(marker) {
    UI.showDetails(marker);
  };

  GMap.setMarkerMovedHandler(markerMoved);
  GMap.setMarkerSelectedHandler(markerSelected);

  GMap.init();
  API.getMarkers(null, function(markers) {
    GMap.drawMarkers(markers);
  });

});

'use strict';

var ActionConstants = require('../constants/action-constants');
var MainDispatcher = require('../dispatchers/main-dispatcher');

var APIClient = require('../apiclient').API;
var GeoLocation = require('../geolocation-helper');

var PointActions = {
  addPoint: function(kind, category) {
    GeoLocation.getPosition(false)
    .then((position) => {
      let marker = Object.assign(position, { kind, category, state: 'ok' });
      APIClient.addMarker(marker, (point) => {
        MainDispatcher.handleViewAction({
          actionType: ActionConstants.ADD_POINT,
          point: point
        });
      }, (err) => {
        console.error(err);
      });
    });
  },

  getAllPoints: function() {
    APIClient.getMarkers(null, (points) => {
      MainDispatcher.handleViewAction({
        actionType: ActionConstants.RECEIVE_POINTS,
        points: points
      });
    }, (err) => {
      console.error(err);
    });
  },

  showPointDetails: function(pointId) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.SHOW_POINT_DETAILS,
      pointId: pointId
    });
  }
};

module.exports = PointActions;

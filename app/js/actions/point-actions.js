'use strict';

var { Actions, Sources } = require('../constants/action-constants');
var MainDispatcher = require('../dispatchers/main-dispatcher');

var APIClient = require('../apiclient').API;
var GeoLocation = require('../geolocation-helper');

var PointActions = {
  addPoint: function(kind, category) {
    GeoLocation.getPosition(false)
    .then((position) => {
      let marker = Object.assign(position, { kind, category, state: 'ok' });
      APIClient.addMarker(marker, (point) => {
        MainDispatcher.handleAction(Sources.SERVER, {
          actionType: Actions.ADD_POINT,
          point: point
        });
      }, (err) => {
        console.error(err);
      });
    });
  },

  getAllPoints: function() {
    APIClient.getMarkers(null, (points) => {
      MainDispatcher.handleAction(Sources.SERVER, {
        actionType: Actions.RECEIVE_POINTS,
        points: points
      });
    }, (err) => {
      console.error(err);
    });
  },

  showPointDetails: function(pointId) {
    MainDispatcher.handleAction(Sources.VIEW, {
      actionType: Actions.SHOW_POINT_DETAILS,
      pointId: pointId
    });
  }
};

module.exports = PointActions;

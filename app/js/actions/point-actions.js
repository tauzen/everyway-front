'use strict';

var ActionConstants = require('../constants/action-constants');
var MainDispatcher = require('../dispatchers/main-dispatcher');

var APIClient = require('../apiclient').API;
var GeoLocation = require('../geolocation-helper');

var PointActions = {
  addPoint: function(kind, category) {
    console.log('adding point');
    GeoLocation.getPosition(false)
    .then((position) => {
      console.log('got position');
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

  cancelAddPoint: function() {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.CANCEL_EDIT_POINT
    });
  },
  savePoint: function(point) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.SAVE_POINT,
      point: point
    });
  },
  editPoint: function(pointId) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.EDIT_POINT,
      pointId: pointId
    });
  },
  cancelEditPoint: function() {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.CANCEL_EDIT_POINT
    });
  },
  updatePoint: function(point) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.UPDATE_POINT,
      point: point
    });
  },
  removePoint: function(pointId) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.REMOVE_POINT,
      pointId: pointId
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
  }
};

module.exports = PointActions;

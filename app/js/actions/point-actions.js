'use strict';

var ActionConstants = require('../constants/action-constants');
var MainDispatcher = require('../dispatchers/main-dispatcher');

var PointActions = {
  addPoint: function(kind, category) {
    MainDispatcher.handleViewAction({
      actionType: ActionConstants.ADD_POINT,
      kind: kind,
      category: category
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
  }
};

module.exports = PointActions;

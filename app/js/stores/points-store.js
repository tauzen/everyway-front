'use strict';

require('babelify/polyfill');
var MainDispatcher = require('../dispatchers/main-dispatcher');
var ActionConstants = require('../constants/action-constants');
var EventEmitter = require('events').EventEmitter;

var _points = [];
var _newPoint = null;
var _editedPoint = null;

var CHANGE_EVENT = 'change';

var PointsStore = Object.assign(EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getNewPoint: function() {
    return _newPoint;
  },

  getPoints: function() {
    return _points;
  },

  dispatcherIndex: MainDispatcher.register((payload) => {
    var action = payload.action;
    console.log('in store', action);
    switch(action.actionType) {
      case ActionConstants.ADD_POINT:
        _newPoint = action.point;
        PointsStore.emitChange();
        break;
      case ActionConstants.RECEIVE_POINTS:
        _points = action.points;
        PointsStore.emitChange();
        break;
    }

    return true;
  })
});

module.exports = PointsStore;

'use strict';

require('babelify/polyfill');
var MainDispatcher = require('../dispatchers/main-dispatcher');
var ActionConstants = require('../constants/action-constants');
var EventEmitter = require('events').EventEmitter;

var _points = [];
var _newPoint = null;
var _editedPoint = null;

var NEW_POINT_EVENT = 'newPointEvent';

var PointsStore = Object.assign(EventEmitter.prototype, {
  emitNewPoint: function() {
    this.emit(NEW_POINT_EVENT);
  },

  addNewPointListener: function(callback) {
    this.on(NEW_POINT_EVENT, callback);
  },

  removeNewPointListener: function(callback) {
    this.removeListener(NEW_POINT_EVENT, callback);
  },

  getNewPoint: function() {
    return _newPoint;
  },

  dispatcherIndex: MainDispatcher.register((payload) => {
    var action = payload.action;
    console.log('in store', action);
    switch(action.actionType) {
      case ActionConstants.ADD_POINT:
        _newPoint = {
          kind: action.kind,
          category: action.category
        };
        PointsStore.emitNewPoint();
        break;
    }

    return true;
  })
});

module.exports = PointsStore;

'use strict';

require('babelify/polyfill');
var _ = require('lodash');

var MainDispatcher = require('../dispatchers/main-dispatcher');
var { Actions } = require('../constants/action-constants');
var EventEmitter = require('events').EventEmitter;

var _points = [];
var _selectedPointId = -1;
var _isSelectedPointEditable = false;
var _isSelectedPointNew = false;

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

  getSelectedPointId: function() {
    return _selectedPointId;
  },

  isSelectedPointEditable: function() {
    return _isSelectedPointEditable;
  },

  isSelectedPointNew: function() {
    return _isSelectedPointNew;
  },

  getPoints: function() {
    return _points;
  },

  dispatcherIndex: MainDispatcher.register((payload) => {
    var action = payload.action;
    console.log('in store', action);
    switch(action.actionType) {
      case Actions.ADD_POINT:
        _selectedPointId = action.point.id;
        _isSelectedPointNew = true;
        _isSelectedPointEditable = true;
        _points = _points.concat([action.point]);
        PointsStore.emitChange();
        break;
      case Actions.RECEIVE_POINTS:
        _points = action.points;
        _selectedPointId = -1;
        _isSelectedPointEditable = false;
        _isSelectedPointNew = false;
        PointsStore.emitChange();
        break;
      case Actions.SHOW_POINT_DETAILS:
        _selectedPointId = action.pointId;
        _isSelectedPointNew = false;
        _isSelectedPointEditable = true;
        PointsStore.emitChange();
        break;
      case Actions.REMOVE_POINT:
        //_.remove(_points, p => p.id === action.pointId);
        _points = _points.filter(p => p.id !== action.pointId);
        _isSelectedPointEditable = false;
        _isSelectedPointNew = false;
        PointsStore.emitChange();
        break;
    }

    return true;
  })
});

module.exports = PointsStore;

'use strict';

require('babelify/polyfill');
var MainDispatcher = require('../dispatchers/main-dispatcher');
var ActionConstants = require('../constants/action-constants');
var EventEmitter = require('events').EventEmitter;

var _points = [{"id":2,"lat":"52.401604","lng":"16.921069","category":"facility","kind":"elevator","state":"broken","votes":null,"comments":[]},{"id":3,"lat":"52.401080","lng":"16.912615","category":"obstacle","kind":"stairs","state":"broken","votes":null,"comments":[]},{"id":4,"lat":"52.404458","lng":"16.924245","category":"obstacle","kind":"high_curb","state":"ok","votes":null,"comments":[]},{"id":5,"lat":"52.403856","lng":"16.932227","category":"facility","kind":"low_curb","state":"ok","votes":null,"comments":[]},{"id":6,"lat":"52.404956","lng":"16.924717","category":"facility","kind":"elevator","state":"ok","votes":null,"comments":[]},{"id":7,"lat":"52.399379","lng":"16.934974","category":"facility","kind":"ramp","state":"ok","votes":null,"comments":[]},{"id":8,"lat":"52.405034","lng":"16.927721","category":"facility","kind":"elevator","state":"broken","votes":null,"comments":[]},{"id":9,"lat":"52.403673","lng":"16.928665","category":"obstacle","kind":"stairs","state":"ok","votes":null,"comments":[]},{"id":10,"lat":"52.402259","lng":"16.930553","category":"facility","kind":"elevator","state":"broken","votes":null,"comments":[]},{"id":11,"lat":"52.402923","lng":"16.933654","category":"obstacle","kind":"high_curb","state":"ok","votes":null,"comments":[]},{"id":12,"lat":"52.400783","lng":"16.928246","category":"facility","kind":"elevator","state":"broken","votes":null,"comments":[]},{"id":13,"lat":"52.401987","lng":"16.927216","category":"obstacle","kind":"slope","state":"ok","votes":null,"comments":[]},{"id":1,"lat":"52.401447","lng":"16.926348","category":"facility","kind":"elevator","state":"failure","votes":null,"comments":[]},{"id":43,"lat":"52.25117196308715","lng":"20.999350726914145","category":"facility","kind":"ramp","state":"ok","votes":1,"comments":[]},{"id":44,"lat":"52.2507235","lng":"20.9999401","category":"facility","kind":"low-curb","state":"ok","votes":1,"comments":[]},{"id":45,"lat":"52.250726199999995","lng":"20.9999269","category":"facility","kind":"ramp","state":"ok","votes":1,"comments":[]},{"id":46,"lat":"52.250974199999995","lng":"20.9997917","category":"facility","kind":"ramp","state":"ok","votes":1,"comments":[]},{"id":41,"lat":"52.250732157932454","lng":"20.999409502971616","category":"facility","kind":"elevator-platform","state":"ok","votes":1,"comments":[]}];
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

  getPoints: function() {
    return _points;
  },

  dispatcherIndex: MainDispatcher.register((payload) => {
    var action = payload.action;
    console.log('in store', action);
    switch(action.actionType) {
      case ActionConstants.ADD_POINT:
        _newPoint = action.point;
        PointsStore.emitNewPoint();
        break;
    }

    return true;
  })
});

module.exports = PointsStore;

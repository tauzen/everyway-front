'use strict';

require('babelify/polyfill');
var Dispatcher = require('flux').Dispatcher;

var MainDispatcher = Object.assign(new Dispatcher(), {
  handleViewAction: function(action) {
    console.log('handleViewAction', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
  handleMapAction: function(action) {
    console.log('handleMapAction', action);
    this.dispatch({
      source: 'MAP_ACTION',
      action: action
    });
  }
});

module.exports = MainDispatcher;

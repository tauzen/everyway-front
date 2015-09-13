'use strict';

require('babelify/polyfill');
var Dispatcher = require('flux').Dispatcher;

var MainDispatcher = Object.assign(new Dispatcher(), {
  handleAction: function(source, action) {
    console.log(`handling action from ${source}`, action);
    this.dispatch({ source, action });
  }
});

module.exports = MainDispatcher;

'use strict';

require('babelify/polyfill');
var EventEmitter = require('events').EventEmitter;

var KINDS_CHANGE = 'change';

var _kinds = [
  {
    category: 'facility',
    description: 'pochylnia',
    kind: 'ramp',
    style: 'icon-fac-poch'
  },
  {
    category: 'facility',
    description: 'podnośnik',
    kind: 'elevator-platform',
    style: 'icon-fac-pod'
  },
  {
    category: 'facility',
    description: 'przyjazny krawężnik',
    kind: 'low-curb',
    style: 'icon-fac-kraw'
  },
  {
    category: 'facility',
    description: 'winda',
    kind: 'elevator',
    style: 'icon-fac-winda'
  },
  {
    category: 'obstacle',
    description: 'nierówności',
    kind: 'cobbles',
    style: 'icon-obs-nierownosci'
  },
  {
    category: 'obstacle',
    description: 'przejście nadziemne',
    kind: 'foot-bridge',
    style: 'icon-obs-prznad'
  },
  {
    category: 'obstacle',
    description: 'pochyłość',
    kind: 'slope',
    style: 'icon-obs-pochylosc'
  },
  {
    category: 'obstacle',
    description: 'schody',
    kind: 'stairs',
    style: 'icon-obs-schody'
  },
  {
    category: 'obstacle',
    description: 'wysoki krawężnik',
    kind: 'high-curb',
    style: 'icon-obs-kraweznik'
  }
];

var KindsStore = Object.assign(EventEmitter.prototype, {
  emitNewPoint: function() {
    this.emit(KINDS_CHANGE);
  },

  addNewPointListener: function(callback) {
    this.on(KINDS_CHANGE, callback);
  },

  removeNewPointListener: function(callback) {
    this.removeListener(KINDS_CHANGE, callback);
  },

  getKinds: function() {
    return _kinds;
  },

  getKindsByCategory: function(category) {
    return _kinds.filter(k => k.category === category);
  },

  getKind: function(kind) {
    return _kinds.find(k => k.kind === kind);
  }
});

module.exports = KindsStore;

'use strict';

require('babelify/polyfill');
var EventEmitter = require('events').EventEmitter;

var KINDS_CHANGE = 'change';
var ICON_PREFIX = 'static/img/markers/';

var _kinds = [
  {
    category: 'facility',
    description: 'pochylnia',
    icon: ICON_PREFIX + 'pochylnia.png',
    kind: 'ramp',
    style: 'icon-fac-poch'
  },
  {
    category: 'facility',
    description: 'podnośnik',
    icon: ICON_PREFIX + 'pochylnia.png',
    kind: 'elevator-platform',
    style: 'icon-fac-pod'
  },
  {
    category: 'facility',
    description: 'przyjazny krawężnik',
    icon: ICON_PREFIX + 'przyjaznykraweznik.png',
    kind: 'low-curb',
    style: 'icon-fac-kraw'
  },
  {
    category: 'facility',
    description: 'winda',
    icon: ICON_PREFIX + 'winda.png',
    kind: 'elevator',
    style: 'icon-fac-winda'
  },
  {
    category: 'obstacle',
    description: 'nierówności',
    icon: ICON_PREFIX + 'nierownosci.png',
    kind: 'cobbles',
    style: 'icon-obs-nierownosci'
  },
  {
    category: 'obstacle',
    description: 'przejście nadziemne',
    icon: ICON_PREFIX + 'przejscienadziemne.png',
    kind: 'foot-bridge',
    style: 'icon-obs-prznad'
  },
  {
    category: 'obstacle',
    description: 'pochyłość',
    icon: ICON_PREFIX + 'pochylosc.png',
    kind: 'slope',
    style: 'icon-obs-pochylosc'
  },
  {
    category: 'obstacle',
    description: 'schody',
    icon: ICON_PREFIX + 'schody.png',
    kind: 'stairs',
    style: 'icon-obs-schody'
  },
  {
    category: 'obstacle',
    description: 'wysoki krawężnik',
    icon: ICON_PREFIX + 'wysokikraweznik.png',
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

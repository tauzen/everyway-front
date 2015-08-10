'use strict';

/* globals google, GeolocationMarker */

var React = require('react');
var _ = require('lodash');
require('../../../../bower_components/geolocation-marker/dist/geolocationmarker-compiled.js');

var KindsStore = require('../../stores/kinds-store');

var MapComponent = React.createClass({
  propTypes: {
    centerLat: React.PropTypes.number.isRequired,
    centerLng: React.PropTypes.number.isRequired,
    points: React.PropTypes.array.isRequired,
    small: React.PropTypes.bool
  },

  getInitialState: function() {
    let kindImgs = {};
    KindsStore.getKinds().forEach(k => kindImgs[k.kind] = k.icon);

    return {
      map: null,
      userMarker: null,
      markers: [],
      kindImgs: kindImgs
    };
  },

  componentDidMount: function() {
    let loc = new google.maps.LatLng(this.props.centerLat,
                                     this.props.centerLng);

    let map = new google.maps.Map(document.getElementById('main-map'), {
      zoom: 19,
      center: loc,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true
    });

    map.setCenter(loc);
    let userMarker = new GeolocationMarker(map);
    userMarker.setCircleOptions({ visible: false });
    userMarker.setMarkerOptions({ zIndex: 999 });

    this.setState({ map, userMarker });
  },

  shouldComponentUpdate: function(nextProps) {
    console.log('update check');
    return this.props.small !== nextProps.small ||
           !_.isEqual(this.props.points, nextProps.points);
  },

  componentDidUpdate: function(prevProps) {
    console.log('Component updated');
    if(!_.isEqual(prevProps.points, this.props.points)) {
      this.drawMarkers();
    }
  },

  componentWillUnmount: function() {
    this.state.map = null;
  },

  createMapMarker: function(point) {
    let loc = new google.maps.LatLng(point.lat, point.lng);
    let img = { url: this.state.kindImgs[point.kind] };

    let marker = new google.maps.Marker({
      position: loc,
      title: point.kind,
      icon: img,
      draggable: true,
      animation: google.maps.Animation.DROP,
      customInfo: point
    });

    return marker;
  },

  drawMarkers: function() {
    this.state.markers.forEach(m => m.setMap(null));
    let markers = this.props.points.map(p => this.createMapMarker(p));
    markers.forEach(m => m.setMap(this.state.map));
    this.setState({ markers });
  },

  render: function() {
    return (
      <section
        className={this.props.small ? 'small-map' : ''}
        id="main-map">
      </section>
    );
  }
});

module.exports = MapComponent;

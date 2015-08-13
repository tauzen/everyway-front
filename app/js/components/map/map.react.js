'use strict';

/* globals google, GeolocationMarker */

var React = require('react');
var Navigation = require('react-router').Navigation;
var _ = require('lodash');
require('../../../../bower_components/geolocation-marker/dist/geolocationmarker-compiled.js');

var KindsStore = require('../../stores/kinds-store');
var PointActions = require('../../actions/point-actions');

var MapComponent = React.createClass({
  propTypes: {
    centerLat: React.PropTypes.number.isRequired,
    centerLng: React.PropTypes.number.isRequired,
    editablePoint: React.PropTypes.bool,
    points: React.PropTypes.array.isRequired,
    selectedPointId: React.PropTypes.number.isRequired,
    small: React.PropTypes.bool
  },

  mixins: [Navigation],

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
           !_.isEqual(this.props.editablePoint, nextProps.editablePoint) ||
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
      draggable: false,
      animation: google.maps.Animation.DROP,
      customInfo: point
    });

    google.maps.event.addListener(marker, 'click', () => {
      //this.state.map.setZoom(19);
      this.state.map.panTo(marker.getPosition());
      this.state.map.panBy(0, window.innerHeight / 4);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 750);
      PointActions.showPointDetails(point.id);
      this.transitionTo('point-details', { id: point.id });
    });

    return marker;
  },

  drawMarkers: function() {
    let visiblePointIds = this.props.points.map(p => p.id);
    let drawnMarkerIds = this.state.markers.map(m => m.customInfo.id);

    let discardedMarkerIds = _.difference(drawnMarkerIds, visiblePointIds);
    discardedMarkerIds.forEach(id => {
      let marker = this.state.markers.find(m => m.customInfo.id === id);
      marker.setMap(null);
    });

    let newMarkerIds = _.difference(visiblePointIds, drawnMarkerIds);
    let newMarkers = this.props.points
    .filter(p => newMarkerIds.indexOf(p.id) !== -1)
    .map(p => this.createMapMarker(p));
    newMarkers.forEach(m => m.setMap(this.state.map));

    let oldMarkerIds = _.intersection(drawnMarkerIds, visiblePointIds);
    let oldMarkers = this.state.markers
    .filter(m => oldMarkerIds.indexOf(m.customInfo.id) !== -1);

    let markers = newMarkers.concat(oldMarkers);
    if(this.props.editablePoint) {
      markers.find(m => m.customInfo.id === this.props.selectedPointId)
      .setDraggable(true);
    }

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

'use strict';

var React = require('react');
var Router = require('react-router');

var GeoLocation = require('../geolocation-helper');
var PointsStore = require('../stores/points-store');
var PointActions = require('../actions/point-actions');

var Header = require('./header.react');
var MapComponent = require('./map/map.react');

var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired
  },

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      selectedPointId: PointsStore.getSelectedPointId(),
      isNewPoint: PointsStore.isSelectedPointNew(),
      isEditablePoint: PointsStore.isSelectedPointEditable(),
      points: PointsStore.getPoints(),
      lat: 52.401080,
      lng: 16.912615
    };
  },

  componentWillMount: function() {
    PointsStore.addChangeListener(this._onPointsChange);
    GeoLocation.getPosition().then(position => {
      this.setState({ lat: position.lat, lng: position.lng });
    });
  },

  componentDidMount: function() {
    this.replaceWith('default');
    PointActions.getAllPoints();
  },

  componentWillUnmount: function() {
    PointsStore.removeChangeListener(this._onPointsChange);
  },

  _onPointsChange: function() {
    this.setState({
      selectedPointId: PointsStore.getSelectedPointId(),
      isNewPoint: PointsStore.isSelectedPointNew(),
      isEditablePoint: PointsStore.isSelectedPointEditable(),
      points: PointsStore.getPoints()
    });
  },

  addPoint: function() {
    this.transitionTo('category-choice');
  },

  backButtonClick: function() {
    if(this.props.path.startsWith('/point/details')) {
      this.replaceWith('default');
    } else {
      this.goBack();
    }
  },

  render: function() {
    let mainView = this.props.path === '/';
    let selectedPoint = null;
    if(!mainView && this.state.selectedPointId !== -1) {
      selectedPoint = this.state.points
                      .find(p => p.id === this.state.selectedPointId);
    }

    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.backButtonClick} />
      <MapComponent
        centerLat={this.state.lat}
        centerLng={this.state.lng}
        editablePoint={this.state.isEditablePoint}
        points={this.state.points}
        selectedPointId={this.state.selectedPointId}
        small={!mainView}/>
      <RouteHandler {...this.props}
        point={selectedPoint}
        pointId={this.state.selectedPointId} />
    </section>
    );
  }
});

module.exports = Main;

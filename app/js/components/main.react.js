'use strict';

var React = require('react');
var Router = require('react-router');

var PointsStore = require('../stores/points-store');
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
      newPoint: null,
      points: []
    };
  },
  componentWillMount: function() {
    PointsStore.addNewPointListener(this._onNewPoint);
  },
  componentDidMount: function() {
    this.replaceWith('default');
  },
  componentWillUnmount: function() {
    PointsStore.removeNewPointListener(this._onNewPoint);
  },
  _onNewPoint: function() {
    console.log('got new point', PointsStore.getNewPoint());
    this.setState({newPoint: PointsStore.getNewPoint()});
  },
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  render: function() {
    let mainView = this.props.path === '/';
    // tmp
    let centerLat = 52.401080;
    let centerLng = 16.912615;
    let points = PointsStore.getPoints();

    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.goBack} />
      <MapComponent centerLat={centerLat} centerLng={centerLng} newPoint={this.state.newPoint} points={points} small={!mainView}/>
      <RouteHandler {...this.props} />
    </section>
    );
  }
});

module.exports = Main;

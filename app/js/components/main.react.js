'use strict';

var React = require('react');
var Router = require('react-router');

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
      editablePoint: PointsStore.getNewPoint(),
      points: PointsStore.getPoints()
    };
  },
  componentWillMount: function() {
    PointsStore.addChangeListener(this._onPointsChange);
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
      editablePoint: PointsStore.getNewPoint(),
      points: PointsStore.getPoints()
    });
  },
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  render: function() {
    let mainView = this.props.path === '/';
    // tmp
    let centerLat = 52.401080;
    let centerLng = 16.912615;

    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.goBack} />
      <MapComponent
        centerLat={centerLat}
        centerLng={centerLng}
        editablePoint={this.state.editablePoint}
        points={this.state.points}
        small={!mainView}/>
      <RouteHandler {...this.props} />
    </section>
    );
  }
});

module.exports = Main;

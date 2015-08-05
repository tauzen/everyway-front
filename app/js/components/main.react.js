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
      newPoint: null
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
    this.setState({newPoint: PointsStore.getNewPoint()});
  },
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  render: function() {
    var mainView = this.props.path === '/';
    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.goBack} />
      <MapComponent newPoint={this.state.newPoint} small={!mainView}/>
      <RouteHandler {...this.props} />
    </section>
    );
  }
});

module.exports = Main;

'use strict';

var React = require('react');
var Router = require('react-router');

var Header = require('./header.react');
var MapComponent = require('./map/map.react');

var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired
  },
  mixins: [Router.Navigation],
  componentDidMount: function() {
    this.replaceWith('default');
  },
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  placeMarker: function() {
    console.log('should place marker on the map right now');
    this.replaceWith('default');
  },
  render: function() {
    var mainView = this.props.path === '/';
    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.goBack} />
      <MapComponent small={!mainView}/>
      <RouteHandler {...this.props} placeMarker={this.placeMarker} />
    </section>
    );
  }
});

module.exports = Main;

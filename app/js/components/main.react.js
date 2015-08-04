'use strict';

var React = require('react');
var Router = require('react-router');

var Header = require('./header.react');
var MapComponent = require('./map/map.react');

var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  mixins: [Router.Navigation],
  componentDidMount: function() {
    this.transitionTo('default');
  },
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  placeMarker: function() {
    console.log('should place marker on the map right now');
    this.replaceWith('default');
  },
  render: function() {
    var small = this.props.path !== '/';
    return (
    <section id="main">
      <Header addPoint={this.addPoint} goBack={() => { this.goBack(); }} />
      <MapComponent small={small}/>
      <RouteHandler {...this.props} placeMarker={this.placeMarker} />
    </section>
    );
  }
});

module.exports = Main;

'use strict';

var React = require('react');
var Router = require('react-router');

var Header = require('./header.react');
var MapComponent = require('./map/map.react');

var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  mixins: [Router.State, Router.Navigation],
  addPoint: function() {
    this.transitionTo('category-choice');
  },
  render: function() {
    var small = this.getPath() !== '/';
    return (
    <section id="main">
      <Header addPoint={this.addPoint} goBack={this.goBack} />
      <MapComponent small={small}/>
      <RouteHandler />
    </section>
    );
  }
});

module.exports = Main;

/*{
  renderUI: function(id) {
    var element = id ? document.getElementById(id) :
                       document.body;
    React.render(<Main />, element);
  }
};*/

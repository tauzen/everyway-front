'use strict';

var React = require('react');
var Header = require('./header.react');
var MapComponent = require('./map/map.react');
var AddPoint = require('./point/add.react');
var PointDetails = require('./point/details.react');

var Main = React.createClass({
  render: function() {
    return (
    <section id="main">
      <Header />
      <MapComponent />
      <AddPoint />
      <PointDetails />
    </section>
    );
  }
});

module.exports = {
  renderUI: function(id) {
    var element = id ? document.getElementById(id) :
                       document.body;
    React.render(<Main />, element);
  }
};


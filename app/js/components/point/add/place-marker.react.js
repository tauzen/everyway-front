'use strict';

var React = require('react');
var Router = require('react-router');

var PlaceMarker = React.createClass({
  componentDidMount: function() {
    this.props.placeMarker(this.props.params.category, this.props.params.kind);
  },
  render: function() {
    return (
      <div>
        Adding {this.props.params.kind}, {this.props.params.category}
      </div>
    );
  }
});

module.exports = PlaceMarker;

'use strict';

var React = require('react');

// TODO move gmap handling from map.js here
var MapComponent = React.createClass({
  propTypes: {
    small: React.PropTypes.bool
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

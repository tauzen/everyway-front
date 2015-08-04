'use strict';

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var AddPoint = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = AddPoint;

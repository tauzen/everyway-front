'use strict';

var React = require('react');

var Header = React.createClass({
  propTypes: {
    addPoint: React.PropTypes.func.isRequired,
    goBack: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="pull-left">
            <button id="main-button-back" onClick={this.props.goBack}></button>
          </div>
          <div className="pull-left main-title"></div>
          <div className="pull-right">
            <button id="main-button-add" onClick={this.props.addPoint} ></button>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;

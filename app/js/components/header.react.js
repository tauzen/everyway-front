'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="pull-left">
            <button id="main-button-back"></button>
          </div>
          <div className="pull-left main-title"></div>
          <div className="pull-right">
            <button id="main-button-add"></button>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;

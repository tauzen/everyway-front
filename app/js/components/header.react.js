'use strict';

var React = require('react');

var Header = React.createClass({
  propTypes: {
    addPoint: React.PropTypes.func.isRequired,
    backVisible: React.PropTypes.bool,
    goBack: React.PropTypes.func.isRequired
  },
  render: function() {
    var btn = <button disabled />;
    if(this.props.backVisible) {
      btn = <button id="main-button-back" onClick={this.props.goBack}></button>;
    }
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="pull-left">
            {btn}
          </div>
          <div className="pull-left main-title"></div>
          <div className="pull-right">
            <button id="main-button-add" onClick={this.props.addPoint}></button>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;

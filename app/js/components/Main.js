'use strict';

var React = require('react');

var Main = React.createClass({
  render: function() {
    return (
      <h1>Hello World!?</h1>
    );
  }
});

React.render(<Main />, document.getElementById('easy-city-app'));

'use strict';

var React = require('react');
var Router = require('react-router');

var routes = require('./config/routes.react');

Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('easy-city-app'));
});

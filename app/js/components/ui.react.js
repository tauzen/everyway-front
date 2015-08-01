'use strict';

var React = require('react');
var Router = require('react-router');

var routes = require('./config/routes.react');

Router.run(routes, function(Root) {
  React.render(<Root />, document.getElementById('easy-city-app'));
});

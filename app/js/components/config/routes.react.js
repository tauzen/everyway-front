'use strict';

var React = require('react');
var Router = require('react-router');

var Main = require('../main.react');
var MapComponent = require('../map/map.react');
var CategoryChoice = require('../point/add/category-choice.react');
var FacilityChoice = require('../point/add/facility-choice.react');
var PointDetails = require('../point/details.react');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route handler={Main} name="app" path="/">
    <Route handler={CategoryChoice} name="category-choice" path="point/category" />
    <Route handler={FacilityChoice} name="facility-choice" path="point/facility" />
    <Route handler={PointDetails} name="point-details" path="point/details/:id" />
    <DefaultRoute handler={MapComponent} />
  </Route>
);

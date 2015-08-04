'use strict';

var React = require('react');
var Router = require('react-router');

var Main = require('../main.react');
var MapComponent = require('../map/map.react');

var AddPoint = require('../point/add/add-point.react');
var CategoryChoice = require('../point/add/category-choice.react');
var KindChoice = require('../point/add/kind-choice.react');
var PlaceMarker = require('../point/add/place-marker.react');

var PointDetails = require('../point/details.react');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route handler={Main} name="app" path="/">
    <Route handler={AddPoint} name="add-point" path="add">
      <DefaultRoute handler={CategoryChoice} name="category-choice" />
      <Route handler={KindChoice} name="kind-choice" path="point/:category" />
      <Route handler={PlaceMarker} name="place-marker" path="point/:category/:kind" />
    </Route>
    <Route handler={PointDetails} name="point-details" path="point/details/:id" />
    <DefaultRoute handler={MapComponent} name="default" />
  </Route>
);

'use strict';

var React = require('react');
var Router = require('react-router');

var PointsStore = require('../stores/points-store');
var PointActions = require('../actions/point-actions');

var Header = require('./header.react');
var MapComponent = require('./map/map.react');

var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired
  },

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      selectedPointId: PointsStore.getSelectedPointId(),
      isNewPoint: PointsStore.isSelectedPointNew(),
      isEditablePoint: PointsStore.isSelectedPointEditable(),
      points: PointsStore.getPoints()
    };
  },

  componentWillMount: function() {
    PointsStore.addChangeListener(this._onPointsChange);
  },

  componentDidMount: function() {
    this.replaceWith('default');
    PointActions.getAllPoints();
  },

  componentWillUnmount: function() {
    PointsStore.removeChangeListener(this._onPointsChange);
  },

  _onPointsChange: function() {
    this.setState({
      selectedPointId: PointsStore.getSelectedPointId(),
      isNewPoint: PointsStore.isSelectedPointNew(),
      isEditablePoint: PointsStore.isSelectedPointEditable(),
      points: PointsStore.getPoints()
    });
    if(this.state.selectedPointId !== -1) {
      this.transitionTo('point-details', { id: this.state.selectedPointId });
    }
  },

  addPoint: function() {
    this.transitionTo('category-choice');
  },

  backButtonClick: function() {
    if(this.props.path.startsWith('/point/details')) {
      this.replaceWith('default');
    } else {
      this.goBack();
    }
  },

  render: function() {
    let mainView = this.props.path === '/';
    // tmp
    let centerLat = 52.401080;
    let centerLng = 16.912615;

    return (
    <section id="main">
      <Header
        addPoint={this.addPoint}
        backVisible={!mainView}
        goBack={this.backButtonClick} />
      <MapComponent
        centerLat={centerLat}
        centerLng={centerLng}
        editablePoint={this.state.isEditablePoint}
        points={this.state.points}
        selectedPointId={this.state.selectedPointId}
        small={!mainView}/>
      <RouteHandler {...this.props} />
    </section>
    );
  }
});

module.exports = Main;

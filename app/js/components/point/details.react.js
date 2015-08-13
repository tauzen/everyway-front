'use strict';

var React = require('react');

var KindsStore = require('../../stores/kinds-store');

var PointDetails = React.createClass({
  propTypes: {
    point: React.PropTypes.object,
    pointId: React.PropTypes.number.isRequired
  },

  shouldComponentUpdate: function(nextProps) {
    return nextProps.pointId !== -1 &&
           nextProps.pointId !== this.props.pointId;
  },

  render: function() {
    var kind = KindsStore.getKind(this.props.point.kind);
    var iconStyle = 'icon icon-big ' + kind.style;
    return (
      <section className="action-section type-obstacle" id="main-details">
        <header id="main-details-type">
          Punkt
        </header>
        <div className="container">
          <div className="row">
            <div className="col-xs-4">
              <div
                className={iconStyle}
                id="main-details-img">
              </div>
            </div>
            <div className="col-xs-8">
              <p id="main-details-category">{kind.description}</p>
              <p id="main-details-upvotes">
                <span className="error">
                  <span id="main-details-upvotes-count">{this.props.point.votes}</span> osobom
                </span> to przeszkadza
              </p>
            </div>
          </div>
          <div className="row main-details-actions">
            <div className="col-xs-12">
              <button
                className="icon-action-przeszkadzami btn-big przeszkadzami"
                id="btn-action-przeszkadzami">
              </button>
              <p className="przeszkadzami">Przeszkadza mi to!</p>
              <button
                className="awaria icon-action-awaria btn-big"
                id="btn-action-awaria">
              </button>
              <p className="awaria">Awaria!</p>
              <button className="btn-big hide" id="btn-action-del">
                Usuń
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = PointDetails;

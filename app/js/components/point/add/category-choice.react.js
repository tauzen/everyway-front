'use strict';

var React = require('react');
var Navigation = require('react-router').Navigation;

var CategoryChoice = React.createClass({
  mixins: [Navigation],
  render: function() {
    return (
      <section className="action-section select-type">
        <header>
          Dodaj punkt
        </header>
        <section>
          <div className="container type-select">
            <div className="row">
              <div className="col-xs-6">
                <button
                  className="btn-big"
                  data-marker-category="facility"
                  id="btn-type-select-facility"
                  onClick={() => this.transitionTo('facility-choice')}>
                </button>
                <p>udogodnienie</p>
              </div>
              <div className="col-xs-6">
                <button
                  className="btn-big"
                  data-marker-category="obstacle"
                  id="btn-type-select-obstacle"
                  onClick={() => this.transitionTo('obstacle-choice')}>
                </button>
                <p>przeszkoda</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
});

module.exports = CategoryChoice;

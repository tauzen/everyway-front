'use strict';

var React = require('react');

var AddPoint = React.createClass({
  render: function() {
    return (
      <section className="action-section select-type" id="main-add">
        <header>
          Dodaj punkt
        </header>
        <section id="main-add-type-select">
          <div className="container type-select">
            <div className="row">
              <div className="col-xs-6">
                <button
                  className="btn-big"
                  data-marker-category="facility"
                  id="btn-type-select-facility">
                </button>
                <p>udogodnienie</p>
              </div>
              <div className="col-xs-6">
                <button
                  className="btn-big"
                  data-marker-category="obstacle"
                  id="btn-type-select-obstacle">
                </button>
                <p>przeszkoda</p>
              </div>
            </div>
          </div>
        </section>
        <section id="main-add-obstacle">
          <div className="container type-select">
            <div className="row">
              <div className="col-xs-4">
                <button
                  className="icon-obs-nierownosci btn-big"
                  data-marker-kind="cobbles"
                  id="btn-obs-nierownosci">
                </button>
                <p>nierówności</p>
              </div>
              <div className="col-xs-4">
                <button
                  className="icon-obs-prznad btn-big"
                  data-marker-kind="foot-bridge"
                  id="btn-obs-prznad">
                </button>
                <p>przejście nadziemne</p>
              </div>
              <div className="col-xs-4">
                <button
                  className="icon-obs-pochylosc btn-big"
                  data-marker-kind="slope"
                  id="btn-obs-pochylosc">
                </button>
                <p>pochyłość</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <button
                  className="icon-obs-schody btn-big"
                  data-marker-kind="stairs"
                  id="btn-obs-schody">
                </button>
                <p>schody</p>
              </div>
              <div className="col-xs-4">
                <button
                  className="icon-obs-kraweznik btn-big"
                  data-marker-kind="high-curb"
                  id="btn-obs-kraweznik">
                </button>
                <p>wysoki krawężnik</p>
              </div>
            </div>
          </div>
        </section>
        <section id="main-add-facility">
          <div className="container type-select">
            <div className="row">
              <div className="col-xs-4">
                <button
                  className="icon-fac-poch btn-big"
                  data-marker-kind="ramp"
                  id="btn-fac-poch">
                </button>
                <p>pochylnia</p>
              </div>
              <div className="col-xs-4">
                <button
                  className="icon-fac-pod btn-big"
                  data-marker-kind="elevator-platform"
                  id="btn-fac-pod">
                </button>
                <p>podnośnik</p>
              </div>
              <div className="col-xs-4">
                <button
                  className="icon-fac-kraw btn-big"
                  data-marker-kind="low-curb"
                  id="btn-fac-kraw">
                </button>
                <p>przyjazny krawężnik</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4">
                <button
                  className="icon-fac-winda btn-big"
                  data-marker-kind="elevator"
                  id="btn-fac-winda">
                </button>
                <p>winda</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
});

module.exports = AddPoint;

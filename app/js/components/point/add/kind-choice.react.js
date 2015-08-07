'use strict';

var React = require('react');
var Router = require('react-router');

var KindsStore = require('../../../stores/kinds-store');
var KindButton = require('./kind-button.react');
var PointActions = require('../../../actions/point-actions');

var KindChoice = React.createClass({
  mixins: [Router.Navigation, Router.State],
  render: function() {
    var cat = this.getParams().category;
    var buttons = KindsStore.getKindsByCategory(cat).map((k, i) => {
      return (
        <KindButton
        category={cat}
        clickHandler={ () => {
          PointActions.addPoint(k.kind, cat);
          //this.transitionTo('place-marker', {category: cat, kind: k.kind});
        }}
        description={k.description}
        key={i}
        kind={k.kind}
        style={k.style} />
      );
    });
    var category = cat === 'facility' ? 'udogodnienie' : 'przeszkodę';

    return (
      <section className="action-section select-type">
        <section>
          <header>
            Dodaj {category}
          </header>
          <div className="container type-select">
            <div className="row">
              {buttons}
            </div>
          </div>
        </section>
      </section>
    );
  }
});

module.exports = KindChoice;

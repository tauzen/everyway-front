'use strict';

var React = require('react');
var Router = require('react-router');

var KindButton = require('./kind-button.react');

var kinds = [
  {
    category: 'facility',
    description: 'pochylnia',
    kind: 'ramp',
    style: 'icon-fac-poch'
  },
  {
    category: 'facility',
    description: 'podnośnik',
    kind: 'elevator-platform',
    style: 'icon-fac-pod'
  },
  {
    category: 'facility',
    description: 'przyjazny krawężnik',
    kind: 'low-curb',
    style: 'icon-fac-kraw'
  },
  {
    category: 'facility',
    description: 'winda',
    kind: 'elevator',
    style: 'icon-fac-winda'
  },
  {
    category: 'obstacle',
    description: 'nierówności',
    kind: 'cobbles',
    style: 'icon-obs-nierownosci'
  },
  {
    category: 'obstacle',
    description: 'przejście nadziemne',
    kind: 'foot-bridge',
    style: 'icon-obs-prznad'
  },
  {
    category: 'obstacle',
    description: 'pochyłość',
    kind: 'slope',
    style: 'icon-obs-pochylosc'
  },
  {
    category: 'obstacle',
    description: 'schody',
    kind: 'stairs',
    style: 'icon-obs-schody'
  },
  {
    category: 'obstacle',
    description: 'wysoki krawężnik',
    kind: 'high-curb',
    style: 'icon-obs-kraweznik'
  }
];

var KindChoice = React.createClass({
  mixins: [Router.Navigation, Router.State],
  render: function() {
    var cat = this.getParams().category;
    var buttons = kinds.filter(k => k.category === cat).map((k, i) => {
      return (
        <KindButton
        category={cat}
        clickHandler={ () => {
          this.props.placeMarker(cat, k.kind);
          //this.transitionTo('place-marker', {category: cat, kind: k.kind});
        }}
        description={k.description}
        kind={k.kind}
        style={k.style}
        key={i} />
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

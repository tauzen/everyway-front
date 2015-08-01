'use strict';

var React = require('react');
var Navigation = require('react-router').Navigation;

var KindButton = require('./kind-button.react');

var facilities = [
  {
    category: 'facilty',
    description: 'pochylnia',
    kind: 'ramp',
    style: 'icon-fac-poch'
  },
  {
    category: 'facilty',
    description: 'podnośnik',
    kind: 'elevator-platform',
    style: 'icon-fac-pod'
  },
  {
    category: 'facilty',
    description: 'przyjazny krawężnik',
    kind: 'low-curb',
    style: 'icon-fac-kraw'
  },
  {
    category: 'facilty',
    description: 'winda',
    kind: 'elevator',
    style: 'icon-fac-winda'
  }
];

var FacilityChoice = React.createClass({
  mixins: [Navigation],
  render: function() {
    var buttons = facilities.map((f) => {
      return (
        <KindButton
        category={f.category}
        description={f.description}
        kind={f.kind}
        style={f.style}
        clickHandler={() => console.log(f.kind) } />
      );
    });

    return (
      <section className="action-section select-type">
        <section>
          <header>
            Dodaj punkt
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

module.exports = FacilityChoice;

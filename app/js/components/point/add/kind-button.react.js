'use strict';

var React = require('react');

var KindButton = React.createClass({
  propTypes: {
    category: React.PropTypes.string.isRequired,
    clickHandler: React.PropTypes.func,
    description: React.PropTypes.string.isRequired,
    kind: React.PropTypes.string.isRequired,
    style: React.PropTypes.string
  },

  render: function() {
    var className = this.props.style + ' btn-big';
    return (
      <div className="col-xs-4" onClick={this.props.clickHandler} >
        <button
          className={className}
          data-marker-category={this.props.category}
          data-marker-kind={this.props.kind}
          >
        </button>
        <p>{this.props.description}</p>
      </div>
    );
  }
});

module.exports = KindButton;

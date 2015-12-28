var React = require('react'),
  ReactDOM = require('react-dom'),
  _ = require('underscore');

var Column = React.createClass({
  propTypes: {
    size: React.PropTypes.oneOf(_.range(1, 13)).isRequired,
    width: React.PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired
  },

  render: function() {
    return (
      <div className={'col-' + this.props.width + '-' + this.props.size}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;

var React = require('react'),
  ReactDOM = require('react-dom'),
  Column = require('./Column.js');

var IconButton = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Column size={3} width="xs">
        <button type="button" className="btn btn-sq btn-primary center-block" onClick={this.props.onClick}>
          <span className={'fa fa-5x ' + this.props.icon} />
          {this.props.children}
        </button>
      </Column>
    );
  }
});

module.exports = IconButton;

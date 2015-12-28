var React = require('react'),
  ReactDOM = require('react-dom');

var Alert = React.createClass({
  propTypes: {
    alertType: React.PropTypes.oneOf(['success', 'danger', 'info', 'warning']).isRequired,
    hidden: React.PropTypes.bool,
    message: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      hidden: true
    };
  },

  render: function() {
    return (
      <div className={'alert alert-' + this.props.alertType + (this.props.hidden ? ' hidden' : '')} role="alert">
        {this.props.message}
      </div>
    );
  }
});

module.exports = Alert;

var React = require('react'),
  ReactDOM = require('react-dom');

var Row = React.createClass({
  render: function() {
    var className = this.props.className || '';
    return (
      <div className={'row ' + className}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Row;

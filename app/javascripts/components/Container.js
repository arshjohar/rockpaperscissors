var React = require('react'),
  ReactDOM = require('react-dom');

var Container = React.createClass({
  render: function() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;

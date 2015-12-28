var React = require('react'),
  ReactDOM = require('react-dom');

var Well = React.createClass({
  render: function() {
    return (
      <div className="well">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Well;

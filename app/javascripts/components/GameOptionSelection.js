var React = require('react'),
  ReactDOM = require('react-dom'),
  _  = require('underscore'),
  Row = require('./Row.js'),
  IconButton = require('./IconButton.js');

var GameOptionSelection = React.createClass({
  propTypes: {
    gameOptions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    playMatch: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Row className="game-option-selection">
        {_.map(this.props.gameOptions, function(gameOption) {
          return <IconButton key={gameOption} icon={'fa-hand-' + gameOption.toLowerCase() + '-o'} onClick={this.props.playMatch.bind(null, 'HUMAN', gameOption)} />
        }.bind(this))}
        <IconButton icon="fa-magic" onClick={this.props.playMatch.bind(null, 'COMPUTER', null)}>
          <br />
          <span>Auto-Select</span>
        </IconButton>
      </Row>
    );
  }
});

module.exports = GameOptionSelection;

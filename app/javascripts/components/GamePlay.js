var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery'),
  Well = require('./Well.js'),
  Container = require('./Container.js'),
  Alert = require('./Alert.js'),
  GameOptionSelection = require('./GameOptionSelection.js');

var GamePlay = React.createClass({
  propTypes: {
    gameOptions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  playMatch: function(firstPlayerType, firstPlayerGameOption, event) {
    $.ajax({
      type: 'POST',
      url: '/api/gameMatches',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        firstPlayerSelection: {
          playerType: firstPlayerType,
          gameOption: firstPlayerGameOption
        },
        secondPlayerSelection: {
          playerType: 'COMPUTER'
        }
      })
    })
    .done(function(gameMatch) {
      this.setState({gameMatch: gameMatch})
    }.bind(this));
  },

  render: function() {
    var infoDiv;
    if (this.state && this.state.gameMatch) {
      infoDiv =
        <div>
          <Well>
            You selected <strong>{this.state.gameMatch.firstPlayerSelection.gameOption}</strong> and the computer selected <strong>{this.state.gameMatch.secondPlayerSelection.gameOption}</strong>.
          </Well>
          <Alert alertType='success' hidden={this.state.gameMatch.gameResult !== 'WIN'} message="You won." />
          <Alert alertType='info' hidden={this.state.gameMatch.gameResult !== 'TIE'} message="Its a tie." />
          <Alert alertType='danger' hidden={this.state.gameMatch.gameResult !== 'LOSS'} message="You lost." />
        </div>
    }
    else {
      infoDiv = null;
    }

    return (
      <Container>
        <GameOptionSelection gameOptions={this.props.gameOptions} playMatch={this.playMatch} />
        {infoDiv}
      </Container>
    );
  }
});

module.exports = GamePlay;

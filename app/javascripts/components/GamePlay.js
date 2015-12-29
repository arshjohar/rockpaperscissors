var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery'),
  _ = require('underscore'),
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
      this.setState({gameMatch: gameMatch, errors: null});
    }.bind(this))
    .fail(function(jqXHR) {
      this.setState({gameMatch: null, errors: jqXHR.responseJSON.errors || [jqXHR.responseJSON.message]})
    }.bind(this));
  },

  render: function() {
    var infoDiv = null;
    if (this.state) {
      if (this.state.gameMatch) {
        infoDiv =
          <div>
            <Well>
              You selected <strong>{this.state.gameMatch.firstPlayerSelection.gameOption}</strong> and the computer selected <strong>{this.state.gameMatch.secondPlayerSelection.gameOption}</strong>.
            </Well>
            <Alert alertType="success" hidden={this.state.gameMatch.gameResult !== 'WIN'} message="You won." />
            <Alert alertType="info" hidden={this.state.gameMatch.gameResult !== 'TIE'} message="Its a tie." />
            <Alert alertType="danger" hidden={this.state.gameMatch.gameResult !== 'LOSS'} message="You lost." />
          </div>
      }
      if (this.state.errors) {
        infoDiv = _.map(this.state.errors, function(errorMsg, index) {
          return <Alert alertType="danger" key={'serverErrorAlert-' + index} hidden={false} message={errorMsg} />;
        });
      }
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

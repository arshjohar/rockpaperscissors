var React = require('react'),
  $ = require('jquery'),
  ReactDOM = require('react-dom');

var GamePlay = require('./components/GamePlay.js'),
  Alert = require('./components/Alert.js');

var renderGamePlayWithOptions = function() {
  $.get('/api/gameOptions')
  .done(function(gameOptions) {
    return ReactDOM.render(<GamePlay gameOptions={gameOptions} />, document.getElementById('game_play'));
  })
  .fail(function() {
    return ReactDOM.render(
      <Alert alertType="danger" hidden={false} message="A server error occured." />,
      document.getElementById('game_play'));
  });
};

renderGamePlayWithOptions();

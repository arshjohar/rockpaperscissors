var React = require('react'),
  $ = require('jquery'),
  ReactDOM = require('react-dom');

var GamePlay = require('./components/GamePlay.js');

var renderGamePlayWithOptions = function() {
  $.get('/api/gameOptions')
  .done(function(gameOptions) {
    return ReactDOM.render(<GamePlay gameOptions={gameOptions} />, document.getElementById('game_play'));
  });
};

renderGamePlayWithOptions();

jest.dontMock('../GamePlay.js');

var GamePlay = require('../GamePlay.js'),
  Container = require('../Container.js'),
  Well = require('../Well.js'),
  Alert = require('../Alert.js'),
  GameOptionSelection = require('../GameOptionSelection.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('GamePlay', function() {
  var buildGameMatch = function(firstPlayerGameOption, secondPlayerGameOption, gameResult) {
    return {
      firstPlayerSelection: {
        playerType: 'HUMAN',
        gameOption: firstPlayerGameOption
      },
      secondPlayerSelection: {
        playerType: 'COMPUTER',
        gameOption: secondPlayerGameOption
      },
      gameResult: gameResult
    };
  };

  var gameOption1 = 'gameOption1';
  var gameOption2 = 'gameOption2';
  var gameOption3 = 'gameOption3';
  var gameOptions = [gameOption1, gameOption2, gameOption3];

  describe('when gameMatch is not present in the state', function() {
    it('renders a GamePlay component with the gameOptions provided in the props', function() {
      var shallowRenderer = TestUtils.createRenderer();

      shallowRenderer.render(
        <GamePlay gameOptions={gameOptions} />
      );

      var gamePlayNode = shallowRenderer.getRenderOutput();
      expect(gamePlayNode.type).toBe(Container);
      var gameOptionSelectionNode = gamePlayNode.props.children[0];
      var infoNode = gamePlayNode.props.children[1];
      expect(gameOptionSelectionNode.type).toBe(GameOptionSelection);
      expect(gameOptionSelectionNode.props.gameOptions).toEqual(gameOptions);
      expect(infoNode).toBeNull();
    });
  });

  describe('when gameMatch is present in the state', function() {
    describe('when the gameResult is TIE', function() {
      var gameMatch = buildGameMatch(gameOption1, gameOption1, 'TIE');

      it('renders with the gameOptions, selection message and info alert visibile and other alerts hidden', function() {
        var gamePlayComponent = TestUtils.renderIntoDocument(
          <GamePlay gameOptions={gameOptions} />
        );

        gamePlayComponent.setState({gameMatch: gameMatch});

        var gamePlayNode = TestUtils.findRenderedComponentWithType(gamePlayComponent, Container);
        var gameOptionSelectionNode = gamePlayNode.props.children[0];
        expect(gameOptionSelectionNode.type).toEqual(GameOptionSelection);
        expect(gameOptionSelectionNode.props.gameOptions).toEqual(gameOptions);
        var infoNodeChildren = gamePlayNode.props.children[1].props.children;
        var wellNode = infoNodeChildren[0];
        expect(wellNode.type).toBe(Well);
        expect(infoNodeChildren[1].type).toBe(Alert);
        expect(infoNodeChildren[1].props).toEqual({alertType: 'success', hidden: true, message: 'You won.'});
        expect(infoNodeChildren[2].type).toBe(Alert);
        expect(infoNodeChildren[2].props).toEqual({alertType: 'info', hidden: false, message: 'Its a tie.'});
        expect(infoNodeChildren[3].type).toBe(Alert);
        expect(infoNodeChildren[3].props).toEqual({alertType: 'danger', hidden: true, message: 'You lost.'});
      });
    });

    describe('when the gameResult is WIN', function() {
      var gameMatch = buildGameMatch(gameOption1, gameOption2, 'WIN');

      it('renders with the gameOptions, selection message and success alert visibile and other alerts hidden', function() {
        var gamePlayComponent = TestUtils.renderIntoDocument(
          <GamePlay gameOptions={gameOptions} />
        );

        gamePlayComponent.setState({gameMatch: gameMatch});

        var gamePlayNode = TestUtils.findRenderedComponentWithType(gamePlayComponent, Container);
        var gameOptionSelectionNode = gamePlayNode.props.children[0];
        expect(gameOptionSelectionNode.type).toEqual(GameOptionSelection);
        expect(gameOptionSelectionNode.props.gameOptions).toEqual(gameOptions);
        var infoNodeChildren = gamePlayNode.props.children[1].props.children;
        var wellNode = infoNodeChildren[0];
        expect(wellNode.type).toBe(Well);
        expect(infoNodeChildren[1].type).toBe(Alert);
        expect(infoNodeChildren[1].props).toEqual({alertType: 'success', hidden: false, message: 'You won.'});
        expect(infoNodeChildren[2].type).toBe(Alert);
        expect(infoNodeChildren[2].props).toEqual({alertType: 'info', hidden: true, message: 'Its a tie.'});
        expect(infoNodeChildren[3].type).toBe(Alert);
        expect(infoNodeChildren[3].props).toEqual({alertType: 'danger', hidden: true, message: 'You lost.'});
      });
    });

    describe('when the gameResult is LOSS', function() {
      var gameMatch = buildGameMatch(gameOption2, gameOption1, 'LOSS');

      it('renders with the gameOptions, selection message and danger alert visibile and other alerts hidden', function() {
        var gamePlayComponent = TestUtils.renderIntoDocument(
          <GamePlay gameOptions={gameOptions} />
        );
        gamePlayComponent.setState({gameMatch: gameMatch});

        var gamePlayNode = TestUtils.findRenderedComponentWithType(gamePlayComponent, Container);
        var gameOptionSelectionNode = gamePlayNode.props.children[0];
        expect(gameOptionSelectionNode.type).toEqual(GameOptionSelection);
        expect(gameOptionSelectionNode.props.gameOptions).toEqual(gameOptions);
                var infoNodeChildren = gamePlayNode.props.children[1].props.children;
        var wellNode = infoNodeChildren[0];
        expect(wellNode.type).toBe(Well);
        expect(infoNodeChildren[1].type).toBe(Alert);
        expect(infoNodeChildren[1].props).toEqual({alertType: 'success', hidden: true, message: 'You won.'});
        expect(infoNodeChildren[2].type).toBe(Alert);
        expect(infoNodeChildren[2].props).toEqual({alertType: 'info', hidden: true, message: 'Its a tie.'});
        expect(infoNodeChildren[3].type).toBe(Alert);
        expect(infoNodeChildren[3].props).toEqual({alertType: 'danger', hidden: false, message: 'You lost.'});
      });
    });
  });

  describe('#playMatch', function() {
    it('sends an ajax with the playerType and gameOption in the args and sets the gameMatch in the state', function() {
      jest.autoMockOff();
      var GamePlay = require('../GamePlay.js'),
        $ = require('jquery');
      var playerType = 'HUMAN';
      var gameMatch = buildGameMatch(gameOption1, gameOption2, 'LOSS');
      $.ajax = jest.genMockFn().mockImpl(function() {
        return $.Deferred().resolve(gameMatch);
      });
      var gamePlay = TestUtils.renderIntoDocument(
        <GamePlay gameOptions={gameOptions} />
      );
      gamePlay.playMatch(playerType, gameOption1);

      expect($.ajax).toBeCalledWith({
        type: 'POST',
        url: '/api/gameMatches',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          firstPlayerSelection: {
            playerType: playerType,
            gameOption: gameOption1
          },
          secondPlayerSelection: {
            playerType: 'COMPUTER'
          }
        })
      });
      expect(gamePlay.state).toEqual({
        gameMatch: gameMatch
      })
    });
  });
});

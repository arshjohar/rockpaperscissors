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

  describe('when both gameMatch or errors are not present in the state', function() {
    it('renders a GamePlay component with the gameOptions provided in the props and a null infoDiv', function() {
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

  describe('when the errors are present in the state', function() {
    it('renders alerts for each of the error messages', function() {
      var gamePlayComponent = TestUtils.renderIntoDocument(
        <GamePlay gameOptions={gameOptions} />
      );
      var errors = ['Got first error', 'Got second error'];
      gamePlayComponent.setState({errors: errors});

      var gamePlayNode = TestUtils.findRenderedComponentWithType(gamePlayComponent, Container);
      var gameOptionSelectionNode = gamePlayNode.props.children[0];
      expect(gameOptionSelectionNode.type).toEqual(GameOptionSelection);
      expect(gameOptionSelectionNode.props.gameOptions).toEqual(gameOptions);
      var errorAlerts = gamePlayNode.props.children[1];
      var firstErrorAlert = errorAlerts[0];
      expect(firstErrorAlert.type).toBe(Alert);
      expect(firstErrorAlert.key).toBe('serverErrorAlert-0');
      expect(firstErrorAlert.props).toEqual({alertType: 'danger', hidden: false, message: errors[0]});
      var secondErrorAlert = errorAlerts[1];
      expect(secondErrorAlert.type).toBe(Alert);
      expect(secondErrorAlert.key).toBe('serverErrorAlert-1');
      expect(secondErrorAlert.props).toEqual({alertType: 'danger', hidden: false, message: errors[1]});
    });
  });

  describe('#playMatch', function() {
    jest.autoMockOff();
    var playerType = 'HUMAN';
    var gameMatch = buildGameMatch(gameOption1, gameOption2, 'LOSS');

    describe('when the ajax call to create a match is successful', function() {
      it('sets the gameMatch to the created gameMatch and sets the errors in the state to null', function() {
        var GamePlay = require('../GamePlay.js'),
          $ = require('jquery');
        $.ajax = jest.genMockFn().mockImpl(function() {
          return $.Deferred().resolve(gameMatch);
        });
        var gamePlay = TestUtils.renderIntoDocument(
          <GamePlay gameOptions={gameOptions} />
        );
        gamePlay.setState({errors: ['some error message']});

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
          gameMatch: gameMatch,
          errors: null
        });
      });
    });

    describe('when the ajax call to create a match fails', function() {
      describe('and the server returns errors in an array', function() {
        it('sets the gameMatch to null and sets the errors in the state to the errors returned', function() {
          var GamePlay = require('../GamePlay.js'),
            $ = require('jquery');
          var jqXHR = {
            responseJSON: {
              errors: ['Got an error']
            }
          };
          $.ajax = jest.genMockFn().mockImpl(function() {
            return $.Deferred().reject(jqXHR);
          });
          var gamePlay = TestUtils.renderIntoDocument(
            <GamePlay gameOptions={gameOptions} />
          );
          gamePlay.setState({gameMatch: gameMatch});

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
            gameMatch: null,
            errors: jqXHR.responseJSON.errors
          });
        });
      });

      describe('and the server returns an error as an object with error message', function() {
        it('sets the gameMatch to null and sets the errors in the state to the error returned as an array', function() {
          var GamePlay = require('../GamePlay.js'),
            $ = require('jquery');
          var jqXHR = {
            responseJSON: {
              message: 'Got an error with a message'
            }
          };
          $.ajax = jest.genMockFn().mockImpl(function() {
            return $.Deferred().reject(jqXHR);
          });
          var gamePlay = TestUtils.renderIntoDocument(
            <GamePlay gameOptions={gameOptions} />
          );
          gamePlay.setState({gameMatch: gameMatch});

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
            gameMatch: null,
            errors: [jqXHR.responseJSON.message]
          });
        });
      });
    });
  });
});

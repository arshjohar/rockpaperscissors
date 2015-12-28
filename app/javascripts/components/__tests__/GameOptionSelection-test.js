jest.autoMockOff();

var GameOptionSelection = require('../GameOptionSelection.js'),
  Row = require('../Row.js'),
  IconButton = require('../IconButton.js'),
  React = require('react'),
  ReactDOM = require('react-dom'),
  TestUtils = require('react-addons-test-utils');

describe('GameOptionSelection', function() {
  var gameOption1 = 'gameOption1';
  var gameOption2 = 'gameOption2';
  var gameOption3 = 'gameOption3';
  var gameOptions = [gameOption1, gameOption2, gameOption3];


  it('renders IconButtons for gameOptions in the props', function() {
    var playMatchFunc = function() {};
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <GameOptionSelection gameOptions={gameOptions} playMatch={playMatchFunc} />
    );

    var gameOptionSelectionNode = shallowRenderer.getRenderOutput();
    var iconButtons = gameOptionSelectionNode.props.children;
    var gameOptionButtons = iconButtons[0];
    var autoSelectButton = iconButtons[1];
    var gameOption1Button = gameOptionButtons[0];
    var gameOption2Button = gameOptionButtons[1];
    var gameOption3Button = gameOptionButtons[2];
    expect(gameOptionSelectionNode.type).toBe(Row);
    expect(gameOptionSelectionNode.props.className).toBe('game-option-selection');
    expect(gameOption1Button.type).toBe(IconButton);
    expect(gameOption1Button.props.icon).toBe('fa-hand-gameoption1-o');
    expect(gameOption1Button.key).toBe(gameOption1);
    expect(gameOption2Button.type).toBe(IconButton);
    expect(gameOption2Button.props.icon).toBe('fa-hand-gameoption2-o');
    expect(gameOption2Button.key).toBe(gameOption2);
    expect(gameOption3Button.type).toBe(IconButton);
    expect(gameOption3Button.props.icon).toBe('fa-hand-gameoption3-o');
    expect(gameOption3Button.key).toBe(gameOption3);
    expect(autoSelectButton.props.icon).toBe('fa-magic');
    expect(autoSelectButton.props.children).toEqual([
      <br />,
      <span>Auto-Select</span>
    ]);
  });

  describe('when a gameOption button is clicked', function() {
    it('calls playMatch with the relevant gameOption and HUMAN as the playerType', function() {
      var playMatchFunc = jasmine.createSpy();
      var gameOptionSelection = TestUtils.renderIntoDocument(
        <GameOptionSelection gameOptions={gameOptions} playMatch={playMatchFunc} />
      );
      var iconButtons = TestUtils.scryRenderedDOMComponentsWithTag(gameOptionSelection, 'button');

      TestUtils.Simulate.click(iconButtons[0]);

      expect(playMatchFunc.calls.mostRecent().args.slice(0, 2)).toEqual(['HUMAN', gameOption1]);
    });
  });

  describe('when the Auto-Select button is clicked', function() {
    it('calls playMatch with the null gameOption and COMPUTER as the playerType', function() {
      var playMatchFunc = jasmine.createSpy();
      var gameOptionSelection = TestUtils.renderIntoDocument(
        <GameOptionSelection gameOptions={gameOptions} playMatch={playMatchFunc} />
      );
      var iconButtons = TestUtils.scryRenderedDOMComponentsWithTag(gameOptionSelection, 'button');

      TestUtils.Simulate.click(iconButtons[3]);

      expect(playMatchFunc.calls.mostRecent().args.slice(0, 2)).toEqual(['COMPUTER', null]);
    });
  });
});

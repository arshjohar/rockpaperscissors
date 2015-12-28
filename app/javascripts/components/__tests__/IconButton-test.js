jest.dontMock('../IconButton.js');

var IconButton = require('../IconButton.js'),
  Column = require('../Column.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('IconButton', function() {
  var icon = 'some-icon';
  var onClickFunc = function() {};
  var shallowRenderer = TestUtils.createRenderer();

  it('renders an IconButton with the child nodes provided in the props', function() {
    var iconButton = shallowRenderer.render(
      <IconButton icon={icon} onClick={onClickFunc}>
        <div></div>
      </IconButton>
    );

    var iconButtonNode = shallowRenderer.getRenderOutput();
    expect(iconButtonNode).toEqual(
      <Column size={3} width="xs">
        <button type="button" className="btn btn-sq btn-primary center-block" onClick={onClickFunc}>
          <span className={'fa fa-5x ' + icon} />
          <div></div>
        </button>
      </Column>
    );
  });
});

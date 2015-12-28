jest.dontMock('../Well.js');

var Well = require('../Well.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('Well', function() {
  it('renders a well with the child nodes provided', function() {
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <Well>
        <span></span>
      </Well>
    );

    var wellNode = shallowRenderer.getRenderOutput();
    expect(wellNode).toEqual(
      <div className="well">
        <span></span>
      </div>
    );
  });
});

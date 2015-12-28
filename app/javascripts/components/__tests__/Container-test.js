jest.dontMock('../Container.js');

var Container = require('../Container.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('Container', function() {
  it('renders a container with the child nodes provided in the props', function() {
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <Container>
        <span></span>
      </Container>
    );

    var containerNode = shallowRenderer.getRenderOutput();
    expect(containerNode).toEqual(
      <div className="container">
        <span></span>
      </div>
    );
  });
});

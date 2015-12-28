jest.dontMock('../Row.js');

var Row = require('../Row.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('Row', function() {
  it('renders a row with the className and the child nodes', function() {
    var className = 'some-class';
    var otherProps = {prop_one: 'prop_one', prop_two: 'prop_two'};
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <Row className={className}>
        <span></span>
      </Row>
    );

    var rowNode = shallowRenderer.getRenderOutput();
    expect(rowNode).toEqual(
      <div className={'row ' + className}>
        <span></span>
      </div>
    );
  });
});

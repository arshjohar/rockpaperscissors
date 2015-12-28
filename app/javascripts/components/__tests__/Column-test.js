jest.dontMock('../Column.js');

var Column = require('../Column.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('Column', function() {
  it('renders a column with the size, width and child nodes provided in the props', function() {
    var colSize = 3;
    var colWidth = 'lg';
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(
      <Column size={colSize} width={colWidth}>
        <span></span>
      </Column>
    );

    var columnNode = shallowRenderer.getRenderOutput();
    expect(columnNode).toEqual(
      <div className={'col-' + colWidth + '-' + colSize}>
        <span></span>
      </div>
    );
  });
});

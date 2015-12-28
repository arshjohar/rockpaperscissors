jest.dontMock('../Alert.js');

var Alert = require('../Alert.js'),
  React = require('react'),
  TestUtils = require('react-addons-test-utils');

describe('Alert', function() {
  var message = 'new message';
  var alertType = 'success';
  var shallowRenderer = TestUtils.createRenderer();

  describe('when hidden is not passed in the props', function() {
    it('constructs a hidden alert with the type and message in the props', function() {
      shallowRenderer.render(<Alert alertType={alertType} message={message} />);

      var alertNode = shallowRenderer.getRenderOutput();
      expect(alertNode).toEqual(
        <div className={'alert alert-' + alertType + ' hidden'} role="alert">
          {message}
        </div>
      );
    });
  });

  describe('when hidden is set to true in the props', function() {
    it('constructs a hidden alert with the type and message in the props', function() {
      shallowRenderer.render(<Alert alertType={alertType} message={message} hidden={true} />);

      var alertNode = shallowRenderer.getRenderOutput();
      expect(alertNode).toEqual(
        <div className={'alert alert-' + alertType + ' hidden'} role="alert">
          {message}
        </div>
      );
    });
  });

  describe('when hidden is set to false in the props', function() {
    it('constructs a visible alert with the type and message in the props', function() {
      shallowRenderer.render(<Alert alertType={alertType} message={message} hidden={false} />);

      var alertNode = shallowRenderer.getRenderOutput();
      expect(alertNode).toEqual(
        <div className={'alert alert-' + alertType} role="alert">
          {message}
        </div>
      );
    });
  });
});

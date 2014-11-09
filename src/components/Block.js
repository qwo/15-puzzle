var React = require('react');
var Style = require('../Style');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');

var Block = PureRenderClassConstructor({
  render: function () {
    return (
      <div style={Style.Block}>
        {this.props.piece}
      </div>
    );
  }
});

module.exports = Block;

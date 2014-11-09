var React = require('react');
var Style = require('../Style');
var Actions = require('../Actions');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');

var Block = PureRenderClassConstructor({
  _handleClick: function () {
    Actions.handleBlockClick(this.props.piece);
  },

  render: function () {
    var entry;
    var style;
    if (this.props.piece === 0) {
      style = Style.Block.Empty;
      entry = '';
    } else {
      style = Style.Block.Base;
      entry = this.props.piece;
    }
    return (
      <div style={style} onClick={this._handleClick}>
        {entry}
      </div>
    );
  }
});

module.exports = Block;

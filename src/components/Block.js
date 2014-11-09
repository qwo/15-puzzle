var React = require('react');
var assign = require('react/lib/Object.assign');
var Style = require('../Style');
var Actions = require('../Actions');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');

var Block = PureRenderClassConstructor({
  _handleClick: function () {
    Actions.handleBlockClick(this.props.piece);
  },

  render: function () {
    var style = assign({}, Style.Block, {
      top: this.props.top,
      left: this.props.left
    });
    var entry = this.props.piece;
    if (entry === 0) {
      return null;
    }
    return (
      <div style={style} onClick={this._handleClick}>
        <div style={Style.Card}>{entry}</div>
      </div>
    );
  }
});

module.exports = Block;

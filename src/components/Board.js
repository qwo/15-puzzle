var React = require('react');
var assign = require('react/lib/Object.assign');
var Style = require('../Style');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');
var calculateSpacing = require('./utils/calculateSpacing');
var Block = require('./Block');
var Grid = require('./Grid');

var Board = PureRenderClassConstructor({
  render: function () {
    var outlet = this.props.board.map(function (piece, i) {
      var spacing = calculateSpacing(i);
      return (
        <Block
          key={piece}
          piece={piece}
          top={spacing.top}
          left={spacing.left}
        />
      );
    });
    return (
      <div style={Style.Board}>
        <Grid/>
        <div style={Style.Blocks}>
          {outlet}
        </div>
      </div>
    );
  }
});

module.exports = Board;

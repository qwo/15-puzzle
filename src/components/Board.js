var React = require('react');
var Style = require('../Style');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');
var Block = require('./Block');

var Board = PureRenderClassConstructor({
  render: function () {
    var outlet = this.props.board.reduce(function (agg, piece, i) {
      var row = i / 4 | 0;
      agg[row].push(
        <Block
          key={i}
          piece={piece}
        />
      );
      return agg;
    }, [
      [],
      [],
      [],
      []
    ]).map(function (children, i) {
      return (
        <div key={i} style={Style.Row}>
          {children}
        </div>
      );
    });
    return (
      <div style={Style.Board}>
        {outlet}
      </div>
    );
  }
});

module.exports = Board;

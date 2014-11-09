var React = require('react');
var assign = require('react/lib/Object.assign');
var Style = require('../Style');
var PureRenderClassConstructor = require('./utils/PureRenderClassConstructor');
var calculateSpacing = require('./utils/calculateSpacing');

var Grid = PureRenderClassConstructor({
  render: function () {
    var outlet = [];
    for (var i = 0; i < 16; i++) {
      var spacing = calculateSpacing(i);
      var style = assign({}, Style.GridBlock, spacing);
      outlet.push(
        <div key={i} style={style}>
          <div style={Style.GridCard}></div>
        </div>
      );
    }
    return (
      <div style={Style.Grid}>
        {outlet}
      </div>
    );
  }
});

module.exports = Grid;

var Style = require('../../Style');

function calculateSpacing(i) {
  var row = i / 4 | 0;
  var column = i % 4;
  var top = row * Style.gridSpacing + (row + 1) * Style.marginSpacing;
  var left = column * Style.gridSpacing + (column + 1) * Style.marginSpacing;
  return {
    top: top,
    left: left
  };
}

module.exports = calculateSpacing;

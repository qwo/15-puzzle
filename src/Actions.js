var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');

var Actions = {
  handleBlockClick: function (piece) {
    Dispatcher.handleViewAction({
      actionType: Constants.HANDLE_BLOCK_CLICK,
      piece: piece
    });
  },
  shuffleBoard: function () {
    Dispatcher.handleViewAction({
      actionType: Constants.SHUFFLE_BOARD
    });
  }
};

module.exports = Actions;

var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');

var Actions = {
  handleBlockClick: function (piece) {
    Dispatcher.handleViewAction({
      actionType: Constants.HANDLE_BLOCK_CLICK,
      piece: piece
    });
  }
};

module.exports = Actions;

var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./Constants');
var State = require('./State.js');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = assign({}, State);

function handleBlockClick(piece) {
  var pieceSpace = _state.board.indexOf(piece);
  var emptySpace = _state.board.indexOf(0);
  if (emptySpace % 4 === pieceSpace % 4) {
    console.log('sameColumn');
    //handleColumnShift(pieceSpace, emptySpace);
  } else if ((emptySpace / 4 | 0) === (pieceSpace / 4 | 0)) {
    console.log('sameRow');
    //handleColumnShift(pieceSpace, emptySpace);
  }
}

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Set the application state
   * @param {object} state the new state
   */
  setState: function (state) {
    _state = state;
  },

  /**
   * Get the application state
   * @return {object} application state
   */
  getState: function () {
    return _state;
  },

  dispatcherIndex: Dispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case Constants.HANDLE_BLOCK_CLICK:
        handleBlockClick(action.piece);
        Store.emitChange()
        break;
    }

    return true;
  })

});

module.exports = Store;

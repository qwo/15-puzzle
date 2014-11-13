var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./Constants');
var State = require('./State.js');
var assign = require('react/lib/Object.assign');
var update = require('react/lib/update');

var CHANGE_EVENT = 'change';

var _state = assign({}, State);

function shuffleBoard() {
  // worst shuffle ever made out of boredom, please do not use
  var agg = [];
  var arr = _state.board;
  while (arr.length > 0) {
    var i = (Math.random() * arr.length | 0);
    agg.push(arr[i]);
    arr.splice(i, 1);
  }
  _state.board = agg;
}

function swapContents(a, b) {
  var operations = {};
  var temp = _state.board[a];
  operations[a] = {$set: _state.board[b]};
  operations[b] = {$set: temp};
  _state.board = update(_state.board, operations);
}

function handleRightShift(emptySpace, pieceSpace) {
  for (var i = emptySpace; i > pieceSpace; i--) {
    if (_state.board[i] === 0) {
      swapContents(i, i - 1);
    }
  }
}

function handleLeftShift(emptySpace, pieceSpace) {
  for (var i = emptySpace; i < pieceSpace; i++) {
    if (_state.board[i] === 0) {
      swapContents(i, i + 1);
    }
  }
}

function handleRightShift(emptySpace, pieceSpace) {
  for (var i = emptySpace; i > pieceSpace; i--) {
    if (_state.board[i] === 0) {
      swapContents(i, i - 1);
    }
  }
}

function handleDownShift(emptySpace, pieceSpace) {
  for (var i = emptySpace; i > pieceSpace; i -= 4) {
    if (_state.board[i] === 0) {
      swapContents(i, i - 4);
    }
  }
}

function handleUpShift(emptySpace, pieceSpace) {
  for (var i = emptySpace; i < pieceSpace; i += 4) {
    if (_state.board[i] === 0) {
      swapContents(i, i + 4);
    }
  }
}

function handleBlockClick(piece) {
  var pieceSpace = _state.board.indexOf(piece);
  var emptySpace = _state.board.indexOf(0);
  if (emptySpace === pieceSpace) {
    // what the hell are you even clicking at
    return;
  }
  if (emptySpace % 4 === pieceSpace % 4) {
    if (emptySpace > pieceSpace) {
      handleDownShift(emptySpace, pieceSpace);
    } else {
      handleUpShift(emptySpace, pieceSpace);
    }
  } else if ((emptySpace / 4 | 0) === (pieceSpace / 4 | 0)) {
    if (emptySpace > pieceSpace) {
      handleRightShift(emptySpace, pieceSpace);
    } else {
      handleLeftShift(emptySpace, pieceSpace);
    }
  }
}

var BaseStore = assign({}, EventEmitter.prototype, {
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
  }
});

function createStore(dispatcherCallback, methods) {
  return assign({}, BaseStore, methods, {
    dispatcherIndex: Dispatcher.register(dispatcherCallback)
  });
}

var Store = createStore(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
      case Constants.HANDLE_BLOCK_CLICK:
        handleBlockClick(action.piece);
        Store.emitChange();
        break;
      case Constants.SHUFFLE_BOARD:
        shuffleBoard();
        Store.emitChange();
        break;
    }
    return true;
  }, {

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
  }
});

//var Store = assign({}, BaseStore, {

  /**
   * Set the application state
   * @param {object} state the new state
   */
  //setState: function (state) {
    //_state = state;
  //},

  /**
   * Get the application state
   * @return {object} application state
   */
  //getState: function () {
    //return _state;
  //},

  //dispatcherIndex: Dispatcher.register(function(payload) {
    //var action = payload.action;

    //switch (action.actionType) {
      //case Constants.HANDLE_BLOCK_CLICK:
        //handleBlockClick(action.piece);
        //Store.emitChange();
        //break;
      //case Constants.SHUFFLE_BOARD:
        //shuffleBoard();
        //Store.emitChange();
        //break;
    //}

    //return true;
  //})

//});

module.exports = Store;

var getModel = require('donburi-model').getModel;
var assign = require('react/lib/Object.assign');
var update = require('react/lib/update');
var Constants = require('./Constants');
var State = require('./State');

var Model = getModel(assign({}, State));

function shuffleBoard(board) {
  // worst shuffle ever made out of boredom, please do not use
  var agg = [];
  var arr = board;
  while (arr.length > 0) {
    var i = (Math.random() * arr.length | 0);
    agg.push(arr[i]);
    arr.splice(i, 1);
  }
  return agg;
}

function swapContents(board, a, b) {
  var operations = {};
  var temp = board[a];
  operations[a] = {$set: board[b]};
  operations[b] = {$set: temp};
  var newBoard = update(board, operations);
  return newBoard;
}

function handleRightShift(board, emptySpace, pieceSpace) {
  var newBoard = board;
  for (var i = emptySpace; i > pieceSpace; i--) {
    if (newBoard[i] === 0) {
      newBoard = swapContents(newBoard, i, i - 1);
    }
  }
  return newBoard;
}

function handleLeftShift(board, emptySpace, pieceSpace) {
  var newBoard = board;
  for (var i = emptySpace; i < pieceSpace; i++) {
    if (newBoard[i] === 0) {
      newBoard = swapContents(newBoard, i, i + 1);
    }
  }
  return newBoard;
}

function handleRightShift(board, emptySpace, pieceSpace) {
  var newBoard = board;
  for (var i = emptySpace; i > pieceSpace; i--) {
    if (newBoard[i] === 0) {
      newBoard = swapContents(newBoard, i, i - 1);
    }
  }
  return newBoard;
}

function handleDownShift(board, emptySpace, pieceSpace) {
  var newBoard = board;
  for (var i = emptySpace; i > pieceSpace; i -= 4) {
    if (newBoard[i] === 0) {
      newBoard = swapContents(newBoard, i, i - 4);
    }
  }
  return newBoard;
}

function handleUpShift(board, emptySpace, pieceSpace) {
  var newBoard = board;
  for (var i = emptySpace; i < pieceSpace; i += 4) {
    if (newBoard[i] === 0) {
      newBoard = swapContents(newBoard, i, i + 4);
    }
  }
  return newBoard;
}

function handleBlockClick(board, piece) {
  var newBoard = board;
  var pieceSpace = board.indexOf(piece);
  var emptySpace = board.indexOf(0);
  if (emptySpace === pieceSpace) {
    // what the hell are you even clicking at
    return;
  }
  if (emptySpace % 4 === pieceSpace % 4) {
    if (emptySpace > pieceSpace) {
      newBoard = handleDownShift(newBoard, emptySpace, pieceSpace);
    } else {
      newBoard = handleUpShift(newBoard, emptySpace, pieceSpace);
    }
  } else if ((emptySpace / 4 | 0) === (pieceSpace / 4 | 0)) {
    if (emptySpace > pieceSpace) {
      newBoard = handleRightShift(newBoard, emptySpace, pieceSpace);
    } else {
      newBoard = handleLeftShift(newBoard, emptySpace, pieceSpace);
    }
  }
  return newBoard;
}

Model.register(Constants.HANDLE_BLOCK_CLICK, function (payload) {
  var state = Model.getState();
  var newBoard = handleBlockClick(state.board, payload.piece);
  Model.setState(assign({}, state, {
    board: newBoard
  }));
  Model.update();
});

Model.register(Constants.SHUFFLE_BOARD, function () {
  var state = Model.getState();
  var newBoard = shuffleBoard(state.board);
  Model.setState(assign({}, state, {
    board: newBoard
  }));
  Model.update();
});

module.exports = Model;

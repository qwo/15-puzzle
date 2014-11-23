var React = require('react');
var Style = require('../Style');
var Model = require('../Model');
var Constants = require('../Constants');
var Board = require('./Board');

var AppRoot = React.createClass({
  _handleShuffleClick: function () {
    Model.request(Constants.SHUFFLE_BOARD);
  },

  getInitialState: function() {
    return Model.getState();
  },

  _onChange: function () {
    this.setState(Model.getState());
  },

  componentDidMount: function () {
    Model.subscribe(this._onChange);
  },

  componentWillUnmount: function () {
    Model.unsubscribe(this._onChange);
  },

  render: function () {
    return (
      <div style={Style.MainContainer}>
        <h2>Hello world</h2>
        <p>My state:</p>
        <p>{
          this.state.board.map(function (a) {
            return (<span key={a} style={{margin: 10}}>{a}</span>)
          })
        }</p>
        <Board board={this.state.board}/>
        <button style={Style.ShuffleButton} onClick={this._handleShuffleClick}>
          Shuffle
        </button>
      </div>
    );
  }


});

module.exports = AppRoot;

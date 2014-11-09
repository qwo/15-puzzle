var React = require('react');
var Store = require('../Store');
var Style = require('../Style');
var Board = require('./Board');

var AppRoot = React.createClass({
  getInitialState: function() {
    return Store.getState();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(Store.getState());
  },

  render: function () {
    return (
      <div style={Style.MainContainer}>
        <h2>Hello world</h2>
        <p>My state:</p>
        <p>{
          this.state.board.map(function (a) {
            return (<span style={{margin: 10}}>{a}</span>)
          })
        }</p>
        <Board board={this.state.board}/>
      </div>
    );
  }


});

module.exports = AppRoot;

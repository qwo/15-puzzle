var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./Constants');
var State = require('./State.js');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';

var _state = assign({}, State);

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

    switch (action) {
    }

    return true;
  })

});

module.exports = Store;

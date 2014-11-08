var assign = require('react/lib/Object.assign');
var FluxDispatcher = require('flux').Dispatcher;

var Dispatcher = assign(new FluxDispatcher, {

  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }

});

module.exports = Dispatcher;

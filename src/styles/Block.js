var assign = require('react/lib/Object.assign');

var Base = {
  display: 'inline',
  padding: '100px',
  background: 'rgba(255,0,170,.5)'
};

var Empty = assign({}, Base, {
  background: 'none'
});

module.exports = {
  Base: Base,
  Empty: Empty
};

var React = require('react');
var assign = require('react/lib/Object.assign');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var PureRenderClassConstructor = function (newClass) {
  var classDef = assign(
    {},
    {mixins: [ReactComponentWithPureRenderMixin]},
    newClass
  );
  return React.createClass(classDef);
}

module.exports = PureRenderClassConstructor;

import { __assign, __extends } from "tslib";
import React, { Component } from "react";
var Table = /** @class */ (function(_super) {
  __extends(Table, _super);
  function Table(props) {
    var _this = _super.call(this, props) || this;
    _this.ref = React.createRef();
    _this.properties = [
      "activeRowIndex",
      "columns",
      "columnWidth",
      "dataSource",
      "dateFormatter",
      "datetimeFormatter",
      "height",
      "highlight",
      "implicitColumns",
      "name",
      "numberFormatter",
      "orderable",
      "renderer",
      "rowKey",
      "selectedColumnFields",
      "selectedRowKeys",
      "sizable",
      "translator"
    ];
    _this.events = [
      "anjColumnsDidLoad",
      "anjColumnsDidUpdate",
      "anjRowsWillLoad",
      "anjRowsDidLoad",
      "anjTableWillUpdate",
      "anjTableDidUpdate"
    ];
    return _this;
  }
  Table.prototype.componentDidMount = function() {
    var _this = this;
    this.properties.forEach(function(property) {
      var propertyValue = _this.props[property];
      _this.ref.current[property] = propertyValue;
    });
    this.events.forEach(function(event) {
      var eventFn = _this.props[event];
      if (eventFn) {
        _this.ref.current.addEventListener(event, eventFn);
      }
    });
  };
  Table.prototype.componentDidUpdate = function(prevProps) {
    var _this = this;
    this.properties.forEach(function(property) {
      var propertyValue = _this.props[property];
      var prevProp = prevProps[property];
      var currProp = _this.props[property];
      if (prevProp != currProp) {
        _this.ref.current[property] = propertyValue;
      }
    });
    this.events.forEach(function(event) {
      var prevEvent = prevProps[event];
      var currEvent = _this.props[event];
      if (prevEvent !== event) {
        _this.ref.current.removeEventListener(event, prevEvent);
        _this.ref.current.addEventListener(event, currEvent);
      }
    });
  };
  Table.prototype.render = function() {
    var _this = this;
    /* Pass all other props, e.g., React Synthetic Events like 'onClick'
     * or aria attrs like 'aria-label' to custom element
     */
    var others = Object.keys(this.props).reduce(function(accumulator, key) {
      var isAria = key.indexOf("aria-") === 0;
      var notCustomProperty = _this.properties.indexOf(key) === -1;
      var notCustomEvent = _this.events.indexOf(key) === -1;
      if (isAria || (notCustomProperty && notCustomEvent)) {
        accumulator[key] = _this.props[key];
      }
      return accumulator;
    }, {});
    return React.createElement(
      "anj-table",
      __assign({ ref: this.ref }, others)
    );
  };
  return Table;
})(Component);
export { Table };
//# sourceMappingURL=table.js.map

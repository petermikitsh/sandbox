import { __assign, __extends } from "tslib";
import React, { Component } from "react";
var Column = /** @class */ (function(_super) {
  __extends(Column, _super);
  function Column(props) {
    var _this = _super.call(this, props) || this;
    _this.ref = React.createRef();
    _this.properties = [
      "translator",
      "caption",
      "cellFormatter",
      "cellRenderer",
      "cellTemplate",
      "dataType",
      "defaultValue",
      "editFormatter",
      "editRenderer",
      "editTemplate",
      "editable",
      "field",
      "filter",
      "filterable",
      "filterTypes",
      "groupIndex",
      "groupKey",
      "groupKeys",
      "headerFormatter",
      "headerRenderer",
      "index",
      "internal",
      "name",
      "pinnable",
      "pinned",
      "options",
      "orderable",
      "overflow",
      "rules",
      "selectable",
      "sizable",
      "sortable",
      "sortIndex",
      "sortOrder",
      "span",
      "table",
      "width",
      "visible"
    ];
    _this.events = [];
    return _this;
  }
  Column.prototype.componentDidMount = function() {
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
  Column.prototype.componentDidUpdate = function(prevProps) {
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
  Column.prototype.render = function() {
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
      "anj-column",
      __assign({ ref: this.ref }, others)
    );
  };
  return Column;
})(Component);
export { Column };
//# sourceMappingURL=column.js.map

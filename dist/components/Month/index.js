"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _DayCell = _interopRequireWildcard(require("../DayCell"));
var _format = _interopRequireDefault(require("date-fns/format"));
var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));
var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));
var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));
var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));
var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));
var _isWeekend = _interopRequireDefault(require("date-fns/isWeekend"));
var _isWithinInterval = _interopRequireDefault(require("date-fns/isWithinInterval"));
var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } /* eslint-disable no-fallthrough */
function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  const now = new Date();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: styles.weekDays
  }, (0, _eachDayOfInterval.default)({
    start: (0, _startOfWeek.default)(now, dateOptions),
    end: (0, _endOfWeek.default)(now, dateOptions)
  }).map((day, i) => /*#__PURE__*/_react.default.createElement("span", {
    className: styles.weekDay,
    key: i
  }, (0, _format.default)(day, weekdayDisplayFormat, dateOptions))));
}
class Month extends _react.PureComponent {
  render() {
    const now = new Date();
    const {
      displayMode,
      focusedRange,
      drag,
      styles,
      disabledDates,
      disabledDay
    } = this.props;
    const minDate = this.props.minDate && (0, _startOfDay.default)(this.props.minDate);
    const maxDate = this.props.maxDate && (0, _endOfDay.default)(this.props.maxDate);
    const monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions, this.props.fixedHeight);
    let ranges = this.props.ranges;
    if (displayMode === 'dateRange' && drag.status) {
      let {
        startDate,
        endDate
      } = drag.range;
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range;
        return {
          ...range,
          startDate,
          endDate
        };
      });
    }
    const showPreview = this.props.showPreview && !drag.disablePreview;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles.month,
      style: this.props.style
    }, this.props.showMonthName ? /*#__PURE__*/_react.default.createElement("div", {
      className: styles.monthName
    }, (0, _format.default)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)) : null, this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat), /*#__PURE__*/_react.default.createElement("div", {
      className: styles.days,
      onMouseLeave: this.props.onMouseLeave
    }, (0, _eachDayOfInterval.default)({
      start: monthDisplay.start,
      end: monthDisplay.end
    }).map((day, index) => {
      const isStartOfMonth = (0, _isSameDay.default)(day, monthDisplay.startDateOfMonth);
      const isEndOfMonth = (0, _isSameDay.default)(day, monthDisplay.endDateOfMonth);
      const isOutsideMinMax = minDate && (0, _isBefore.default)(day, minDate) || maxDate && (0, _isAfter.default)(day, maxDate);
      const isDisabledSpecifically = disabledDates.some(disabledDate => (0, _isSameDay.default)(disabledDate, day));
      const isDisabledDay = disabledDay(day);
      return /*#__PURE__*/_react.default.createElement(_DayCell.default, _extends({}, this.props, {
        ranges: ranges,
        day: day,
        preview: showPreview ? this.props.preview : null,
        isWeekend: (0, _isWeekend.default)(day, this.props.dateOptions),
        isToday: (0, _isSameDay.default)(day, now),
        isStartOfWeek: (0, _isSameDay.default)(day, (0, _startOfWeek.default)(day, this.props.dateOptions)),
        isEndOfWeek: (0, _isSameDay.default)(day, (0, _endOfWeek.default)(day, this.props.dateOptions)),
        isStartOfMonth: isStartOfMonth,
        isEndOfMonth: isEndOfMonth,
        key: index,
        disabled: isOutsideMinMax || isDisabledSpecifically || isDisabledDay,
        isPassive: !(0, _isWithinInterval.default)(day, {
          start: monthDisplay.startDateOfMonth,
          end: monthDisplay.endDateOfMonth
        }),
        styles: styles,
        onMouseDown: this.props.onDragSelectionStart,
        onMouseUp: this.props.onDragSelectionEnd,
        onMouseEnter: this.props.onDragSelectionMove,
        dragRange: drag.range,
        drag: drag.status
      }));
    })));
  }
}
Month.defaultProps = {};
Month.propTypes = {
  style: _propTypes.default.object,
  styles: _propTypes.default.object,
  month: _propTypes.default.object,
  drag: _propTypes.default.object,
  dateOptions: _propTypes.default.object,
  disabledDates: _propTypes.default.array,
  disabledDay: _propTypes.default.func,
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object
  }),
  showPreview: _propTypes.default.bool,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onDragSelectionStart: _propTypes.default.func,
  onDragSelectionEnd: _propTypes.default.func,
  onDragSelectionMove: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  monthDisplayFormat: _propTypes.default.string,
  weekdayDisplayFormat: _propTypes.default.string,
  dayDisplayFormat: _propTypes.default.string,
  showWeekDays: _propTypes.default.bool,
  showMonthName: _propTypes.default.bool,
  fixedHeight: _propTypes.default.bool
};
var _default = exports.default = Month;
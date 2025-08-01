import React from 'react';
import { mount, shallow } from 'enzyme';
import DefinedRange from '../DefinedRange';
import isSameDay from "date-fns/isSameDay";
describe('DefinedRange tests', () => {
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
    const renderStaticRangeLabel = jest.fn();
    mount( /*#__PURE__*/React.createElement(DefinedRange, {
      staticRanges: [{
        label: 'Dynamic Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        }
      }, {
        label: 'Hede',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });
  test('Should render dynamic static label contents correctly', () => {
    const renderItalicLabelContent = () => /*#__PURE__*/React.createElement("i", {
      className: 'italic-label-content'
    }, 'Italic Content');
    const renderBoldLabelContent = () => /*#__PURE__*/React.createElement("b", {
      className: 'bold-label-content'
    }, 'Bold Content');
    const renderSomethingElse = () => /*#__PURE__*/React.createElement("img", {
      className: 'random-image'
    });
    const renderStaticRangeLabel = function (staticRange) {
      let result;
      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }
      return result;
    };
    const wrapper = shallow( /*#__PURE__*/React.createElement(DefinedRange, {
      staticRanges: [{
        id: 'italic',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        }
      }, {
        id: 'whatever',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        id: 'bold',
        range: {},
        isSelected(range) {
          const definedRange = this.range();
          return isSameDay(range.startDate, definedRange.startDate) && isSameDay(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(wrapper).toMatchSnapshot();
  });
});
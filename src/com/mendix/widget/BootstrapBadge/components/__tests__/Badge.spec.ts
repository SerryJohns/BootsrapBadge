import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeProps } from "../Badge";
import { BadgeComponent, BadgeItem } from "../Badgelable";

import { MxDataMock, MxLogger, MxMock, MxUiMock } from "../../../../../../../tests/mocks/Mendix";

describe("A badge button", () => {
  const renderBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));
  // let mxOriginal: mx.mx;

  // beforeAll(() => {
  //   mxOriginal = window.mx;
  //   window.logger = MxLogger.prototype;
  //   window.mx = MxMock.prototype;
  //   window.mx.ui = MxUiMock.prototype;
  //   window.mx.data = MxDataMock.prototype;
  // });
  it("should be of a badge structure", () => {
    const button = renderBadge({ badgeValue: "0" });
    console.log(button.debug());
    expect(button).toBeElement(
      // createElement(BadgeItem, {})
      DOM.button({
        className: "btn btn-warning",
        onClick: jasmine.any(Function) as any,
        style: { width: null }
      })
    );
  });

//   it("contains spec with an expectation", () => {
//     // 
//   });
// });

// describe("A badge label", () => {
//   it("contains spec with an expectation", () => {
//     // 
//   });

//   it("contains spec with an expectation", () => {
//     // 
//   });
 });

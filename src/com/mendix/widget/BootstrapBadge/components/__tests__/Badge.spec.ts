import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeProps } from "../Badge";
import { BadgeComponent, BadgeItem } from "../Badgelable";

describe("A badge button", () => {
  const renderBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));
  it("should be of a badge structure", () => {
    const button = renderBadge({ badgeValue: "" });
    console.log(button.debug());
    expect(button).toBeElement(
      createElement(BadgeItem, {})
      // DOM.button({})
    );
  });

  it("contains spec with an expectation", () => {
    // 
  });
});

// describe("A badge label", () => {
//   it("contains spec with an expectation", () => {
//     // 
//   });

//   it("contains spec with an expectation", () => {
//     // 
//   });
// });

import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeComponent, BadgeProps } from "../BadgeComponent";
import { ButtonBadgeItem } from "../BadgeButton";

describe("Badge button", () => {
  const badgeProps: BadgeProps = {
    badgeType: "btn",
    badgeValue: "0",
    bootstrapStyle: "default",
    label: "default",
    MicroflowProps: "",
    className: "widget-badge btn btn-default"

  };
  
  const shallowButton = (props: BadgeProps) => (shallow(createElement(ButtonBadgeItem, props)));

  it("renders correct structure", () => {

    const buttonwrapper = shallowButton(badgeProps);
    expect(buttonwrapper.type()).toBe("button");
    expect(buttonwrapper.prop("className")).toBe("widget-badge btn btn-default");
    expect(buttonwrapper.childAt(0).type()).toBe("span");
    expect(buttonwrapper.childAt(0).prop("className")).toBe("widget-badge-text");
    expect(buttonwrapper.childAt(0).text()).toBe("default");
    expect(buttonwrapper.childAt(1).type()).toBe("span");
    expect(buttonwrapper.childAt(1).prop("className")).toBe("badge");
    expect(buttonwrapper.childAt(1).text()).toBe("0");

  });

});

describe("Badge label", () => {
    it("renders correct structure", () => {
      "";
    });
  });

describe("Badge", () => {
  it("renders correct structure", () => {
    "";
  });
});

describe("BadgeComponent", () => {
    const badgeProps: BadgeProps = {
    badgeType: "btn",
    badgeValue: "0",
    bootstrapStyle: "default",
    label: "default",
    MicroflowProps: "",
    className: "widget-badge btn btn-default"

  };

  const shallowBadge = (props: BadgeProps) => (shallow(createElement(BadgeComponent, props)));

  it("should render a ButtonBadge", () => {
    const buttonwrapper = shallowBadge(badgeProps);
    const button = buttonwrapper.find(ButtonBadgeItem);
    expect(button.prop("badgeValue")).toBe("0");
  });
});

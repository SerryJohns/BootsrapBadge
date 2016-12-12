import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ButtonBadgeItem } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";

describe("Badge button", () => {
    const badgeProps: BadgeProps = {
        MicroflowProps: "",
        badgeType: "btn",
        badgeValue: "0",
        bootstrapStyle: "default",
        className: "widget-badge btn btn-default",
        label: "default"
    };

    const defaultMx = window.mx;
    const shallowButton = (props: BadgeProps) => (shallow(createElement(ButtonBadgeItem, props)));

    it("renders correct structure", () => {
            // toBeElement & toMatchStructure were returning unexpected errors
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
    describe("BadgeComponent", () => {

            const shallowBadge = (props: BadgeProps) => (shallow(createElement(BadgeComponent, props)));
        it("should render a button", () => {
            const buttonwrapper = shallowBadge(badgeProps);
            const button = buttonwrapper.find(ButtonBadgeItem);

            expect(button.prop("badgeValue")).toBe("0");
            expect(button.hasClass("badgeType")).toBe(false);
            expect(button.hasClass("bootstrapStyle")).toBe(false);
            expect(button.prop("className")).toBe("widget-badge btn btn-default");
            expect(button.prop("label")).toBe("default");
        });
    });
});
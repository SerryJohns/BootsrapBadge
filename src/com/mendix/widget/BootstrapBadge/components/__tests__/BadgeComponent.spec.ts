import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ButtonBadgeItem } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeItem } from "../BadgeLabel";

describe("BadgeComponent", () => {
           const badgeProps: BadgeProps = {
               MicroflowProps: "",
               badgeType: "btn",
               badgeValue: "0",
               bootstrapStyle: "default",
               className: "widget-badge btn btn-default",
               label: "default"
           };

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


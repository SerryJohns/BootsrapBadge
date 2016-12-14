import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeButton } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeLabel } from "../BadgeLabel";

describe("BadgeComponent", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));
    let badgeProps: BadgeProps = {
        badgeValue: "0",
        bootstrapStyle: "success",
        label: "Custom label",
        onClick: jasmine.any(Function) as any
    };

    describe("of type button", () => {
        it("should render the structure", () => {
            badgeProps.badgeType = "btn";
            const badgeComponent = createBadge(badgeProps);
            let badgeButtonProps: BadgeProps = {
                badgeType: "btn",
                badgeValue: badgeProps.badgeValue,
                className: "widget-badge btn btn-success",
                label: badgeProps.label,
                onClick: jasmine.any(Function) as any
            };
            expect(badgeComponent).toBeElement(createElement(BadgeButton, badgeButtonProps));
        });

        describe("and style success", () => {
            it("should have class widget-badge btn btn-success", () => {
                const badgeComponent = createBadge(badgeProps);
                expect(badgeComponent.hasClass("widget-badge btn btn-success")).toBe(true);
            });
        });
    });

    describe("of type label", () => {
        it("should render the structure", () => {
            badgeProps.badgeType = "label";
            const badgeComponent = createBadge(badgeProps);
            let badgeButtonProps: BadgeProps = {
                badgeType: "label",
                badgeValue: badgeProps.badgeValue,
                className: "widget-badge label label",
                label: badgeProps.label,
                onClick: jasmine.any(Function) as any
            };
            expect(badgeComponent).toBeElement(createElement(BadgeButton, badgeButtonProps));
        });

        describe("and style success", () => {
            it("should have class widget-badge btn label-success", () => {
                const badgeComponent = createBadge(badgeProps);
                expect(badgeComponent.hasClass("widget-badge")).toBe(true);
            });
        });
    });
});

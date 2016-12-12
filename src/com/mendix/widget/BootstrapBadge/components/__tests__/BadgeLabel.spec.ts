import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ButtonBadgeItem } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeItem } from "../BadgeLabel";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

describe("BadgeLabel", () => {
    const badgeProps: BadgeProps = {
        MicroflowProps: "",
        badgeType: "btn",
        badgeValue: "0",
        bootstrapStyle: "default",
        className: "widget-badge-link",
        label: "default"
    };
    const createBadgeLabel = (props: BadgeProps) => shallow(createElement(BadgeItem, props));
    const defaultMx = window.mx;

    beforeAll(() => {
        window.mx = mockMendix;
    });

    it("renders correct structure", () => {
        const badgeLabel = createBadgeLabel(badgeProps);
        expect(badgeLabel.type()).toBe("div");
        expect(badgeLabel.prop("className")).toBe("widget-badge-link");
        expect(badgeLabel.childAt(0).type()).toBe("span");
        expect(badgeLabel.childAt(0).prop("className")).toBe("widget-badge-text");
        expect(badgeLabel.childAt(0).text()).toBe("default");
        expect(badgeLabel.childAt(1).type()).toBe("span");
        expect(badgeLabel.childAt(1).prop("className")).toBe("widget-badge-link");
        expect(badgeLabel.childAt(1).text()).toBe("0");
    });

    describe("badge", () => {
        const OnClickProps: OnClickProps = {
            microflow: "IVK_Onclick",
            guid: "2",
            applyto: "",
            mxform: "",
            name: "IVK_Onclick"
        };

        badgeProps.MicroflowProps = OnClickProps;

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeLabel = createBadgeLabel(badgeProps);

            badgeLabel.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalledWith(badgeProps.MicroflowProps.name, {
                error: jasmine.any(Function), params: {
                    applyto: "selection",
                    guids: [OnClickProps.guid]
                }
            });
        });

        it("should not run onclick event if action name is empty", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const emptyMicroflow: OnClickProps = { name: "" };
            const badgeWrapper = createBadgeLabel(badgeProps);

            expect(window.mx.ui.action).not.toHaveBeenCalled();
        });
    });

        afterAll(() => window.mx = defaultMx);
});
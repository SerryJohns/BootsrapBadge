import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ButtonBadgeItem } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeItem } from "../BadgeLabel";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

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

    describe("Badge label", () => {
            const badgeProps: BadgeProps = {
                MicroflowProps: "",
                badgeType: "btn",
                badgeValue: "0",
                bootstrapStyle: "default",
                className: "widget-badge-link",
                label: "default"
            };
           const shallowLable = (props: BadgeProps) => (shallow(createElement(BadgeItem, props)));

        it("renders correct structure", () => {
            const lablewrapper = shallowLable(badgeProps);
            expect(lablewrapper.type()).toBe("div");
            expect(lablewrapper.prop("className")).toBe("widget-badge-link");
            expect(lablewrapper.childAt(0).type()).toBe("span");
            expect(lablewrapper.childAt(0).prop("className")).toBe("widget-badge-text");
            expect(lablewrapper.childAt(0).text()).toBe("default");
            expect(lablewrapper.childAt(1).type()).toBe("span");
            expect(lablewrapper.childAt(1).prop("className")).toBe("widget-badge-link");
            expect(lablewrapper.childAt(1).text()).toBe("0");
        });
    });

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


    describe("Badge", () => {
            const OnClickProps: OnClickProps = {
                microflow: "IVK_Onclick",
                guid: "2",
                applyto: "",
                mxform: "",
                name: "IVK_Onclick"
            };

            const shallowOnClick = (props: BadgeProps) => (shallow(createElement(BadgeComponent, props)));

        beforeAll(() => {
          window.mx = mockMendix;
        });

        it("should respond to click event", () => {
            spyOn(window.mx.data, "action").and.callThrough();
            const badgeWrapper = shallowOnClick(OnClickProps);

            badgeWrapper.props().MicroflowProps;

            expect(window.mx.data.action).toHaveBeenCalled();
            expect(window.mx.data.action).toHaveBeenCalledWith({
                error: jasmine.any(Function), params: {
                    actionname: OnClickProps.name,
                    applyto: "selection",
                    guids: [OnClickProps.guid]
                }
            });
        });

        it("should not run onclick event if action name is empty", () => {
            spyOn(window.mx.data, "action").and.callThrough();
            const emptyMicroflow: OnClickProps = { name: "" };
            const badgeWrapper = shallowOnClick(OnClickProps);

            badgeWrapper.props().MicroflowProps;

            expect(window.mx.data.action).not.toHaveBeenCalled();
        });
    });

    afterAll(() => window.mx = defaultMx);
});


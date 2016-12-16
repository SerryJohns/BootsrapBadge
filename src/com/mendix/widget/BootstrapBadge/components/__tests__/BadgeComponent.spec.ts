import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeButton } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeLabel } from "../BadgeLabel";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

describe("BadgeComponent", () => {

    beforeAll(() => {
        window.mx = mockMendix;
    });

    const defaultMx = window.mx;
    const createBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));
    const badgeProps: BadgeProps = {
        badgeValue: "0",
        bootstrapStyle: "success",
        label: "Custom label",
        onClick: jasmine.any(Function) as any
    };

    describe("of type button", () => {
        let badgeButtonProps: BadgeProps = {
            badgeType: "btn",
            badgeValue: badgeProps.badgeValue,
            className: "widget-badge",
            label: badgeProps.label,
            onClick: jasmine.any(Function) as any
        };
        const badgeComponent = createBadge(badgeButtonProps);
        it("should render the structure", () => {
            badgeProps.badgeType = "btn";
            expect(badgeComponent).toBeElement(createElement(BadgeButton, badgeButtonProps));
        });

        describe("and style success", () => {
            it("should have class widget-badge btn btn-success", () => {
                expect(badgeComponent.hasClass("widget-badge")).toBe(true);
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

    describe("with an onClick microflow", () => {
        it("executes the microflow when a badge / label item is clicked", () => {
            const onClickProps: OnClickProps = {
                applyto: "selection",
                guid: "2",
                microflow: "",
                name: "IVK_Onclick"
            };
            const badgeButtonProps: BadgeProps = {
                MicroflowProps: onClickProps,
                badgeType: "btn",
                badgeValue: badgeProps.badgeValue,
                className: "widget-badge",
                label: badgeProps.label,
                onClick: jasmine.any(Function) as any
            };
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeButtonProps);

            const button = badgeComponent.find(BadgeButton);
            badgeComponent.find(BadgeButton).simulate("click");
            expect(button.props().MicroflowProps).toBe(badgeButtonProps.MicroflowProps);

            expect(window.mx.ui.action).toHaveBeenCalledWith({
                error: jasmine.any(Function), params: {
                    actionname: onClickProps.name,
                    applyto: "selection",
                    guids: [ onClickProps.guid ]
                }
            });
        });
    });

    describe("without an onClick microflow", () => {
        const OnClickProps: OnClickProps = {
            applyto: "",
            guid: "2",
            microflow: "IVK_Onclick",
            name: ""
        };
        it("does not respond when a badge / label item is clicked", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeProps);

            expect(window.mx.ui.action).not.toHaveBeenCalled();
        });
    });

    afterAll(() => window.mx = defaultMx);

});

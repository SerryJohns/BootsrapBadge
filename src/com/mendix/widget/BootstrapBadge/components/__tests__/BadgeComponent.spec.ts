import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

describe("BadgeComponent", () => {
    let badgeProps: BadgeProps;
    beforeAll(() => {
        window.mx = mockMendix;
    });
    beforeEach(() => {
        badgeProps = {
            MicroflowProps: {
                applyto: "selection",
                guid: "2",
                microflow: "IVK_Onclick"
            },
            badgeValue: "0",
            bootstrapStyle: "default",
            label: "default"
        };
    });

    const defaultMx = window.mx;
    const createBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));

    describe("of type button", () => {
        beforeEach(() => {
            badgeProps.badgeType = "btn";
        });

        it("should render the structure", () => {
            const badgeComponent = createBadge(badgeProps);
            expect(badgeComponent).toBeElement(
                DOM.button(
                    {
                        className: "widget-badge btn btn-default",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                    DOM.span({ className: "badge" }, badgeProps.badgeValue)
                )
            );
        });

        it("with style 'success' should have class 'widget-badge btn btn-success'", () => {
            badgeProps.bootstrapStyle = "success";
            const badgebutton = createBadge(badgeProps);
            expect(badgebutton.hasClass("widget-badge btn btn-success")).toBe(true);
        });

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgebutton = createBadge(badgeProps);

            badgebutton.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });

    });

    describe("of type badge", () => {
        beforeEach(() => {
            badgeProps.badgeType = "badge";
        });

        it("should render the structure", () => {
            const badgeComponent = createBadge(badgeProps);

            expect(badgeComponent).toBeElement(
                DOM.div(
                    {
                        className: "widget-badge-display",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                    DOM.span({ className: "widget-badge badge label-default" }, badgeProps.badgeValue)
                )
            );
        });

        it("with style 'success' should have class 'widget-badge badge label-success'", () => {
            badgeProps.bootstrapStyle = "success";
            const badgeComponent = createBadge(badgeProps);
            expect(badgeComponent.childAt(1).hasClass("widget-badge badge label-success")).toBe(true);
        });

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeProps);

            badgeComponent.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });

    });

    describe("of type label", () => {
        beforeEach(() => {
            badgeProps.badgeType = "label";
        });

        it("should render the structure", () => {
            const badgeComponent = createBadge(badgeProps);
            expect(badgeComponent).toBeElement(
                DOM.div(
                    {
                        className: "widget-badge-display",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                    DOM.span({ className: "widget-badge label label-default" }, badgeProps.badgeValue)
                )
            );
        });

        it("with style 'success' should have class 'widget-badge label label-success'", () => {
            badgeProps.bootstrapStyle = "success";
            const badgeComponent = createBadge(badgeProps);
            expect(badgeComponent.childAt(1).hasClass("widget-badge label label-success")).toBe(true);
        });

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeProps);

            badgeComponent.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });

    });

    describe("with an onClick microflow", () => {
        it("executes the microflow when a badge / label item is clicked", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeProps);

            badgeComponent.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalledWith(badgeProps.MicroflowProps.microflow, {
                error: jasmine.any(Function),
                params: {
                    applyto: "selection",
                    guids: [ badgeProps.MicroflowProps.guid ]
                }
            });
        });
    });

    describe("without an onClick microflow", () => {

        it("does not respond when a badge / label item is clicked", () => {
            badgeProps.MicroflowProps.microflow = "";
            spyOn(window.mx.ui, "action").and.callThrough();

            const badgeComponent = createBadge(badgeProps);
            badgeComponent.simulate("click");

            expect(window.mx.ui.action).not.toHaveBeenCalled();
        });
    });

    afterAll(() => window.mx = defaultMx);

});

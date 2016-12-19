import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

describe("BadgeComponent", () => {
    beforeAll(() => {
        window.mx = mockMendix;
    });

    const defaultMx = window.mx;
    const createBadge = (props: BadgeProps) => shallow(createElement(BadgeComponent, props));
    // TODO: Use typescript assignment techniques while assigning the global props to props within a nested describe.
    const badgeProps: BadgeProps = {
        MicroflowProps: {
            applyto: "selection",
            guid: "2",
            microflow: "IVK_Onclick"
        },
        badgeValue: "0",
        bootstrapStyle: "default",
        label: "default"
    };

    describe("of type button", () => {
        const props: BadgeProps = {
            MicroflowProps: badgeProps.MicroflowProps,
            badgeType: "btn",
            badgeValue: badgeProps.badgeValue,
            bootstrapStyle: badgeProps.bootstrapStyle,
            label: badgeProps.label
        };
        const badgeComponent = createBadge(props);

        it("should render the structure", () => {
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

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgebutton = createBadge(props);

            badgebutton.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });
        describe("and style success", () => {
            let newProps = props;
            newProps.bootstrapStyle = "success";
            const badgeComponent_ = createBadge(newProps);
            it("should have class widget-badge btn btn-success", () => {
                expect(badgeComponent_.hasClass("widget-badge btn btn-success")).toBe(true);
            });
        });

    });

    describe("of type badge", () => {
        const props: BadgeProps = {
            MicroflowProps: badgeProps.MicroflowProps,
            badgeType: "badge",
            badgeValue: badgeProps.badgeValue,
            bootstrapStyle: badgeProps.bootstrapStyle,
            label: badgeProps.label
        };
        const badgeComponent = createBadge(props);
        it("should render the structure", () => {
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

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgebutton = createBadge(props);

            badgebutton.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });

        describe("and style success", () => {
            it("should have class widget-badge badge label-success", () => {
                let newProps = props;
                newProps.bootstrapStyle = "success";
                const badgeComponent_ = createBadge(newProps);
                expect(badgeComponent_.childAt(1).hasClass("widget-badge badge label-success")).toBe(true);
            });
        });
    });

    describe("of type label", () => {
        const props: BadgeProps = {
            MicroflowProps: badgeProps.MicroflowProps,
            badgeType: "label",
            badgeValue: "0",
            bootstrapStyle: "default"
        };
        const badgeComponent = createBadge(props);
        it("should render the structure", () => {
            expect(badgeComponent).toBeElement(
                DOM.div(
                    {
                        className: "widget-badge-display",
                        onClick: jasmine.any(Function) as any
                    },
                    DOM.span({ className: "widget-badge-text" }, props.label),
                    DOM.span({ className: "widget-badge label label-default" }, props.badgeValue)
                )
            );
        });

        it("should respond to click event", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgebutton = createBadge(props);

            badgebutton.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalled();
        });

        describe("and style success", () => {
            it("should have class widget-badge label label-success", () => {
                let newProps = props;
                newProps.bootstrapStyle = "success";
                const badgeComponent_ = createBadge(newProps);
                expect(badgeComponent_.childAt(1).hasClass("widget-badge label label-success")).toBe(true);
            });
        });
    });

    describe("with an onClick microflow", () => {
        it("executes the microflow when a badge / label item is clicked", () => {
            const badgeOnclickProps: BadgeProps = {
                MicroflowProps: {
                    applyto: "selection",
                    guid: "2",
                    microflow: ""
                }
            };
            const ClickProps: OnClickProps = {
                applyto: "selection",
                guid: "2"
            };
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(badgeOnclickProps);

            badgeComponent.simulate("click");

            expect(window.mx.ui.action).toHaveBeenCalledWith({
                error: jasmine.any(Function),
                params: {
                    applyto: "selection",
                    guids: [ ClickProps.guid ]
                }
            });
        });
    });

    describe("without an onClick microflow", () => {
        const props: BadgeProps = {
            MicroflowProps: {
                applyto: "selection",
                guid: "2",
                microflow: ""
            },
            badgeType: "badge",
            badgeValue: badgeProps.badgeValue,
            bootstrapStyle: badgeProps.bootstrapStyle,
            label: badgeProps.label
        };
        it("does not respond when a badge / label item is clicked", () => {
            spyOn(window.mx.ui, "action").and.callThrough();
            const badgeComponent = createBadge(props);
            badgeComponent.simulate("click");

            expect(window.mx.ui.action).not.toHaveBeenCalled();
        });
    });

    afterAll(() => window.mx = defaultMx);

});

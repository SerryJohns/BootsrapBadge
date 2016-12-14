import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeProps } from "../BadgeComponent";
import { BadgeLabel } from "../BadgeLabel";

describe("Label", () => {
    const createLabel = (props: BadgeProps) => shallow(createElement(BadgeLabel, props));
    const badgeProps: BadgeProps = {
        badgeValue: "0",
        className: "widget-badge-link",
        label: "Custom label",
        onClick: jasmine.createSpy("onClick")
    };

    it("renders the structure correctly", () => {
        const badgeLabel = createLabel(badgeProps);
        expect(badgeLabel).toBeElement(
            DOM.div(
                {
                    className: "widget-badge-link",
                    onClick: jasmine.any(Function) as any
                },
                DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                DOM.span({ className: badgeProps.className }, badgeProps.badgeValue)
            )
        );
    });

    it("should respond to click event", () => {
        const badgeButton = createLabel(badgeProps);

        badgeButton.simulate("click");

        expect(badgeProps.onClick).toHaveBeenCalled();
    });
});

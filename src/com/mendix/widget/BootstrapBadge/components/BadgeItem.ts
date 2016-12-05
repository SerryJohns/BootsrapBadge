import { createElement } from "react";
import { DOM } from "react";
// tslint:disable-next-line:ordered-imports
import { ButtonBadgeItem } from "./BadgeButton";
import { BadgeProps, onClickMF} from "./Badge";

export function BadgeComponent(props: BadgeProps) {
    // Tenary operator should use className
    // Missing generic widget class name "widget-"
    const badgeClasses = props.badgeType === "label"
        ? "label label-" + props.bootstrapStyle
        : props.badgeType === "btn"
        ? "btn btn-" + props.bootstrapStyle
        : "badge label-" + props.bootstrapStyle;

    return createElement(props.badgeType === "btn" ? ButtonBadgeItem : BadgeItem, {
        MicroflowProps: props.MicroflowProps,
        badgeValue: props.badgeValue,
        className: badgeClasses,
        label: props.label
    });
}

export const BadgeItem = (props: BadgeProps) =>
    DOM.div(
        {
            className: "badge-badge-link",
            onClick: () => {
                onClickMF(props);
            }
        },
        DOM.span({ className: "badge-badge-text" }, props.label),
        DOM.span({ className: props.className }, props.badgeValue)
    );

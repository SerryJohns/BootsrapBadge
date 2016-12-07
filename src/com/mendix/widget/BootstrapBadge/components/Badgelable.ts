import { createElement } from "react";
import { DOM } from "react";

import { BadgeProps } from "./Badge";
import { ButtonBadgeItem } from "./BadgeButton";

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
            onClick: () => onClickMF(props)
        },
        DOM.span({ className: "badge-badge-text" }, props.label),
        DOM.span({ className: props.className }, props.badgeValue)
    );

    const onClickMF = (props: BadgeProps) => {
    // The used props are all optional.... so you should check them all.. and if the MicroflowProps really exist.
    // WAS: if (props.MicroflowProps.microflow !== "") {
    // No need to check on empty string, just check on true-sie value
    // That will make the testing easier  
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
            window.mx.data.action({
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing MicroFlow:
                ${props.MicroflowProps.microflow}: ${error.message}`);
            },
                params: {
                    actionname: props.MicroflowProps.microflow,
                    applyto: "selection",
                    guids: [ props.MicroflowProps.guid ],
                }
            });
    }
};

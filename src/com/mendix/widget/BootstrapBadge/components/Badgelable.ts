import * as classNames from "classnames";
import { createElement } from "react";
import { DOM } from "react";

import { BadgeProps, BadgeType } from "./Badge";
import { ButtonBadgeItem } from "./BadgeButton";

export function BadgeComponent(props: BadgeProps) {
    const badgeClasses = (badgeType: BadgeType, bootstrapStyle: string) =>
        classNames( "widget-badge", {
            [`label label-${bootstrapStyle}`] : badgeType === "label",
            [`btn btn-${bootstrapStyle}`] : badgeType === "btn",
            [`badge label-${bootstrapStyle}`] : badgeType === "badge"
        });

    return createElement(props.badgeType === "btn" ? ButtonBadgeItem : BadgeItem, {
        MicroflowProps: props.MicroflowProps,
        badgeValue: props.badgeValue,
        className: badgeClasses(props.badgeType, props.bootstrapStyle),
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
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
            window.mx.data.action({
                error: (error: Error) => {
                    window.mx.ui.error(`Error while executing MicroFlow:
                    ${props.MicroflowProps.microflow}: ${error.message}`);
                },
                params: {
                    actionname: props.MicroflowProps.microflow,
                    applyto: "selection",
                    guids: [ props.MicroflowProps.guid ]
                }
            });
    }
};

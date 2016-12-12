import { DOM } from "react";

import { BadgeProps } from "./BadgeComponent";


export const BadgeItem = (props: BadgeProps) =>
    DOM.div(
        {
            className: "widget-badge-link",
            onClick: () => onClickMF(props)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: props.className }, props.badgeValue)
    );

const onClickMF = (props: BadgeProps) => {
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
        window.mx.ui.action(props.MicroflowProps.microflow, {
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing MicroFlow:
                ${props.MicroflowProps.microflow}: ${error.message}`);
            },
            params: {
                applyto: "selection",
                guids: [ props.MicroflowProps.guid ]
            }
        });
    }
};

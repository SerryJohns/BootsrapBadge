import { DOM } from "react";

import { BadgeProps,onClickMF } from "./BadgeComponent";


export const BadgeLabel = (props: BadgeProps) =>
    DOM.div(
        {
            className: "widget-badge-link",
            onClick: () => onClickMF(props)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: props.className }, props.badgeValue)
    );

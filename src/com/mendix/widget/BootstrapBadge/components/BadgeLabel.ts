import { DOM } from "react";

import { BadgeProps } from "./BadgeComponent";

export const BadgeLabel = (props: BadgeProps) =>
    DOM.div(
        {
            className: "widget-badge-link",
            onClick: () => props.onClick(props.MicroflowProps)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: props.className }, props.badgeValue)
    );

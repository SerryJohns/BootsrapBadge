import { BadgeProps } from "./BadgeComponent";
import { DOM, createElement } from "react";

export const BadgeButton = (props: BadgeProps) =>
    createElement(props.badgeType === "btn" ? "button" : "div",
        {
            className: props.badgeType === "btn" ? props.className : "widget-badge-link",
            onClick: () => props.onClick(props.MicroflowProps)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: props.badgeType === "btn" ? "badge" : props.className }, props.badgeValue)
    );

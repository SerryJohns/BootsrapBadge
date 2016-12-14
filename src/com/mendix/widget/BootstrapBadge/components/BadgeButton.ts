import { BadgeProps,onClickMF } from "./BadgeComponent";
import { DOM, createElement } from "react";
import { BadgeLabel } from "./BadgeLabel";

export const BadgeButton = (props: BadgeProps) =>
    DOM.button(
        {
            className: props.className,
            onClick: () => onClickMF(props)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: "badge" }, props.badgeValue)
    );

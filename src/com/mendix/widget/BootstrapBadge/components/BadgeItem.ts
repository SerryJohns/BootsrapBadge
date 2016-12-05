import { DOM } from "react";
import { BadgeProps, onClickMF} from "./Badge";

// Indents are wrong
// make use of arrow function no need for return statement.
// export const BadgeItem = (props: BadgeProps) =>

export const BadgeItem = (props: BadgeProps) => {
    return (
        DOM.div({
            className: "badge-badge-link",
            onClick: () => {
                onClickMF(props);
            }
        }, DOM.span({ className: "badge-badge-text" }, props.label),
            DOM.span({ className: props.className }, props.badgeValue))
    );
};

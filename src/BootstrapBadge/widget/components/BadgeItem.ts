import { BadgeProps, onClickMF} from "./Badge";
import { DOM } from "react";

export function BadgeItem(props: BadgeProps) {
    return (
        DOM.div({
            className: "badge-link",
            onClick: () => {
                onClickMF(props);
            }
        }, DOM.span({ className: "badge-text" }, props.label),
            DOM.span({ className: props.className }, props.val))
    );
}
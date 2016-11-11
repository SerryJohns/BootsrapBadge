import { BadgeProps, onClickMF} from "./Badge";
import { DOM } from "react";

export function ButtonBadgeItem(props: BadgeProps) {
    return (
        DOM.button({
            className: props.className, itemType: "button",
            onClick: () => {
                    onClickMF(props);
                }
            },
            DOM.span({ className: "badge-badge-text" }, props.label),
            DOM.span({ className: "badge" }, props.badgeValue)

        )
        );
}

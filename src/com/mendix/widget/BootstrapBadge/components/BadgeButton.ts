import { BadgeProps, onClickMF} from "./Badge";
import { DOM } from "react";

// Indents are wrong
// make use of arrow function no need for return statement.
// export const ButtonBadgeItem = (props: BadgeProps) =>
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

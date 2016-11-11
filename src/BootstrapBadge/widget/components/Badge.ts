import { ButtonBadgeItem } from "./BadgeButton";
import { BadgeItem } from "./BadgeItem";
import { createElement } from "react";

export interface OnClickProps {
    microflow?: string;
    guid?: string;
    applyto?: string;
    caller?: string;
    widgetId?: string;
    mxform?: string;
}

export interface BadgeProps {
    label?: string;
    val?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: string;
    // "btn" | "label" | "badge"
}

export function BadgeComponent(props: BadgeProps) {
    let badgeClass: string;
    badgeClass = props.badgeType;

    if (props.badgeType === "btn") {
        badgeClass += " btn-" + props.bootstrapStyle;
        return createElement(ButtonBadgeItem, {
            className: badgeClass,
            label: props.label,
            val: props.val,
            MicroflowProps: props.MicroflowProps
        });
    } else {
        badgeClass += " label-" + props.bootstrapStyle;
        return createElement(BadgeItem, {
            className: badgeClass,
            label: props.label,
            val: props.val,
            MicroflowProps: props.MicroflowProps
        });
    }
}

export function onClickMF(props: BadgeProps) {
    return (
        mx.data.action({
            error: (error) => {
                mx.ui.error(`Error while executing MicroFlow: 
                    ${props.MicroflowProps.microflow}: ${error.message}`);
            },
            params: {
                actionname: props.MicroflowProps.microflow,
                applyto: "selection",
                guids: [ props.MicroflowProps.guid ]
            }
        })
    );
}

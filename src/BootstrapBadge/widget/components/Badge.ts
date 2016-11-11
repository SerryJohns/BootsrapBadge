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
    badgeValue?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: string;
    // "btn" | "label" | "badge"
}

export function BadgeComponent(props: BadgeProps) {
    let badgeClass: string;

    badgeClass = props.badgeType === "label" ? "label label-" + props.bootstrapStyle :
        props.badgeType === "btn" ? "btn btn-" + props.bootstrapStyle : "badge label-" + props.bootstrapStyle;


    return createElement(props.badgeType === "btn" ? ButtonBadgeItem : BadgeItem, {
        MicroflowProps: props.MicroflowProps,
        badgeValue: props.badgeValue,
        className: badgeClass,
        label: props.label
    });

}

export function onClickMF(props: BadgeProps) {
    if (props.MicroflowProps.microflow !== "") {
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
}

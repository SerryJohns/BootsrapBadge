import { createElement } from "react";
import { ButtonBadgeItem } from "./BadgeButton";
import { BadgeItem } from "./BadgeItem";

export interface OnClickProps {
    microflow?: string; // optional?
    guid?: string; // optional?
    applyto?: string; // not used
    caller?: string;  // not used, should be used?
    widgetId?: string; // not used
    mxform?: string; // not used
}

export interface BadgeProps {
    label?: string;
    badgeValue?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: string; // why not use this string typing?
    // "btn" | "label" | "badge" 
}

export function BadgeComponent(props: BadgeProps) {
    // Tenary operator should break on new line with : and ? and the beginning of the line
    // Though should use className
    // Always ust const instead of let, when variable will not change...
    // Make it plural if the content is plural ... badgeClass vs badgeClasses
    // Missing generic widget class name "widget-"
    // Don't cater for buttons and labels here, this should happen in their own component ButtonBadgeItem or BadgeItem.
    let badgeClasses = props.badgeType === "label"
        ? "label label-" + props.bootstrapStyle
        : props.badgeType === "btn"
        ? "btn btn-" + props.bootstrapStyle
        : "badge label-" + props.bootstrapStyle;

    return createElement(props.badgeType === "btn" ? ButtonBadgeItem : BadgeItem, {
        MicroflowProps: props.MicroflowProps,
        badgeValue: props.badgeValue,
        className: badgeClasses,
        label: props.label
    });
}

export function onClickMF(props: BadgeProps) {
    // The used props are all optional.... so you should check them all.. and if the MicroflowProps really exist.
    // WAS: if (props.MicroflowProps.microflow !== "") {
    // No need to check on empty string, just check on true-sie value
    // That will make the testing easier  
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
        // why return? all function will return....
        return (
            // Make use of global more explicit by using window.mx......
            mx.data.action({ // Better use window.mx.ui.action
                error: (error) => { // no need
                    window.mx.ui.error(`Error while executing MicroFlow: 
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

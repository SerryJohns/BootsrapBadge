import * as classNames from "classnames";
import { DOM, createElement } from "react";

export interface OnClickProps {
    microflow?: string;
    guid?: string;
    applyto?: string;
    name?: string;
}

export interface BadgeProps {
    label?: string;
    badgeValue?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: BadgeType;
    onClick?: (props: OnClickProps) => void;
}

export type BadgeType = "btn" | "label" | "badge";

const badgeClasses = (badgeType: BadgeType, bootstrapStyle: string, MicroflowProps: OnClickProps) => {
    const badgeClass = classNames( "widget-badge", {
            [`label label-${bootstrapStyle}`] : badgeType === "label",
            [`btn btn-${bootstrapStyle}`] : badgeType === "btn",
            [`badge label-${bootstrapStyle}`] : badgeType === "badge"
        });
    const parentClasses = classNames({
            [`${badgeClass}`]: badgeType === "btn",
            [`widget-badge-display`]: badgeType !== "btn"
        },
        { ["widget-badge-link"]: (badgeType !== "btn" && MicroflowProps && MicroflowProps.microflow.trim().length > 0) }
    );
    const childClasses = badgeType === "btn" ? "badge" : badgeClass;

    return { parentClasses, childClasses };
};

export const BadgeComponent = (props: BadgeProps) => {
    const componentClasses = badgeClasses(props.badgeType, props.bootstrapStyle, props.MicroflowProps);
    return createElement(props.badgeType === "btn" ? "button" : "div",
        {
            className: componentClasses.parentClasses,
            onClick: () => onClickMF(props.MicroflowProps)
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({ className: componentClasses.childClasses }, props.badgeValue)
    );
};

export const onClickMF = (props: OnClickProps) => {
    if (props.microflow && props.guid) {
        window.mx.ui.action(props.microflow, {
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing MicroFlow:
                ${props.microflow}: ${error.message}`);
            },
            params: {
                applyto: "selection",
                guids: [ props.guid ]
            }
        });
    }
};

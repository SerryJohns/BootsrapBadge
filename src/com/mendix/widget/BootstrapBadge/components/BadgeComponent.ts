import * as classNames from "classnames";
import { createElement } from "react";

import { BadgeButton } from "./BadgeButton";

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

const badgeClasses = (badgeType: BadgeType, bootstrapStyle: string) =>
        classNames( "widget-badge", {
            [`label label-${bootstrapStyle}`] : badgeType === "label",
            [`btn btn-${bootstrapStyle}`] : badgeType === "btn",
            [`badge label-${bootstrapStyle}`] : badgeType === "badge"
        });

export const BadgeComponent = (props: BadgeProps) =>
    createElement(BadgeButton, {
        MicroflowProps: props.MicroflowProps,
        badgeType: props.badgeType,
        badgeValue: props.badgeValue,
        className: badgeClasses(props.badgeType, props.bootstrapStyle),
        label: props.label,
        onClick: onClickMF/*(onClickProps: OnClickProps) => onClickMF(onClickProps)*/
    });

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

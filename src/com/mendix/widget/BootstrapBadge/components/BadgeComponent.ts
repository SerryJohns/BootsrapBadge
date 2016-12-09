import * as classNames from "classnames";
import { createElement } from "react";

import { ButtonBadgeItem } from "./BadgeButton";
import { BadgeItem } from "./BadgeLabel";

export interface OnClickProps {
    microflow?: string;
    guid?: string;
    applyto?: string;
    caller?: string;  // not used, should be used?
    widgetId?: string; // not used
    mxform?: string; // not used
    name?: string;
}

export interface BadgeProps {
    label?: string;
    badgeValue?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: BadgeType;
}

export type BadgeType = "btn" | "label" | "badge";

const badgeClasses = (badgeType: BadgeType, bootstrapStyle: string) =>
        classNames( "widget-badge", {
            [`label label-${bootstrapStyle}`] : badgeType === "label",
            [`btn btn-${bootstrapStyle}`] : badgeType === "btn",
            [`badge label-${bootstrapStyle}`] : badgeType === "badge"
        });

export const BadgeComponent = (props: BadgeProps) =>
    createElement(props.badgeType === "btn" ? ButtonBadgeItem : BadgeItem, {
        MicroflowProps: props.MicroflowProps,
        badgeValue: props.badgeValue,
        className: badgeClasses(props.badgeType, props.bootstrapStyle),
        label: props.label
    });

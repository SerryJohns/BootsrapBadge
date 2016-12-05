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

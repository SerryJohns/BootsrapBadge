import { BadgeItem } from "./BadgeItem";


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
    badgeType?: string; // why not use this string typing?
    // "btn" | "label" | "badge" 
}



export function onClickMF(props: BadgeProps) {
    // The used props are all optional.... so you should check them all.. and if the MicroflowProps really exist.
    // WAS: if (props.MicroflowProps.microflow !== "") {
    // No need to check on empty string, just check on true-sie value
    // That will make the testing easier  
    if (props.MicroflowProps && props.MicroflowProps.microflow && props.MicroflowProps.guid) {
            window.mx.data.action({
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing MicroFlow:
                ${props.MicroflowProps.microflow}: ${error.message}`);
            },
                params: {
                    actionname: props.MicroflowProps.microflow,
                    applyto: "selection",
                    guids: [ props.MicroflowProps.guid ]
                }
            });
    }
}

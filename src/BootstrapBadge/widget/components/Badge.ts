import { createElement } from "react";
import { DOM } from "react";

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
    badgeTypeValue?: string;
}

export function BadgeComponent(props: BadgeProps) {
    let badgeClass: string;
    badgeClass = props.badgeTypeValue;

    if (props.badgeTypeValue === "btn") {
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

export function BadgeItem(props: BadgeProps) {
    return (
        DOM.div({
            className: "badge-link",
            onClick: () => {
                if (props.MicroflowProps.microflow !== "") {
                    mx.data.action({
                        error: (error) => {
                            mx.ui.error(`Error while executing MicroFlow: 
                    ${props.MicroflowProps.microflow}: ${error.message}`);
                        },
                        params: {
                            actionname: props.MicroflowProps.microflow,
                            applyto: "selection",
                            guids: [props.MicroflowProps.guid]
                        }
                    });
                }
            }
        }, DOM.span({ className: "badge-text" }, props.label),
            DOM.span({ className: props.className }, props.val))
    );
}

export function ButtonBadgeItem(props: BadgeProps) {
    return (
        DOM.button({
            className: props.className, itemType: "button",
            onClick: () => {
                if (props.MicroflowProps.microflow !== "") {
                    mx.data.action({
                        error: (error) => {
                            mx.ui.error(`Error while executing MicroFlow: 
                    ${props.MicroflowProps.microflow}: ${error.message}`);
                        },
                        params: {
                            actionname: props.MicroflowProps.microflow,
                            applyto: "selection",
                            guids: [props.MicroflowProps.guid]
                        }
                    });
                }
            }
        },
            DOM.span({ className: "badge-text" }, props.label),
            DOM.span({ className: "badge" }, props.val)

        ));
}
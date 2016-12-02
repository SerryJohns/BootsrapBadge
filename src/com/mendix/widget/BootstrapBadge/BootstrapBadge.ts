import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render } from "react-dom";

import { BadgeComponent, OnClickProps} from "./components/Badge";

class BootstrapBadge extends WidgetBase {
    // Attributes from modeler
    private attrValue: string;
    private attrStyle: string;
    private attrLabel: string;
    private badgeType: string;
    private label: string;
    private badgeClass: string;
    private onclickMicroflow: string;

    // internal variables
    private contextObject: mendix.lib.MxObject;
    private handles: number[];
    private badgeValue: string;

    createOnClickProps(): OnClickProps {
        return (
            {
                applyto: "selection",
                guid: this.contextObject.getGuid(),
                microflow: this.onclickMicroflow,
                widgetId: this.id
            }
        );
    }

    postCreate() {
        this.handles = [];
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = object;
        this.resetSubscriptions();
        this.updateRendering();
        callback();
    }

    unsubscribe() {
        if (this.handles) {
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }

    private updateRendering() {
        let attrStyle = this.contextObject ?
            this.getValue(this.contextObject.get(this.attrStyle) as string, this.badgeClass) : this.badgeClass;
        let attrLabel = this.contextObject ?
            this.getValue(this.contextObject.get(this.attrLabel) as string, this.label) : this.label;
        this.badgeValue = this.contextObject ?
            this.getValue(this.contextObject.get(this.attrValue) as string, "0") : "0";

        render(createElement(BadgeComponent, {
            MicroflowProps: this.contextObject ? this.createOnClickProps() : "",
            badgeType: this.badgeType,
            badgeValue: this.badgeValue,
            bootstrapStyle: attrStyle,
            label: attrLabel
        }), this.domNode
        );
    }

    private getValue(attr: string, otherValue: string) {
        return attr ? attr : otherValue;
    }

    private resetSubscriptions() {
        this.unsubscribe();

        if (this.contextObject) {
            this.handles.push( mx.data.subscribe({
                callback: (guid) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            );
            this.handles.push( mx.data.subscribe({
                attr: this.attrValue,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            );

            this.handles.push ( mx.data.subscribe({
                attr: this.attrStyle,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            );

            this.handles.push( mx.data.subscribe ({
                attr: this.attrLabel,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            );
        }
    }
}

let dojoBootstrapBadge = dojoDeclare(
    "BootstrapBadge.widget.BootstrapBadge",
    [ WidgetBase ],
    (function (Source: any) {
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    } (BootstrapBadge))
);

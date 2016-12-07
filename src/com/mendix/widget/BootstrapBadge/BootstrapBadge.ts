import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render } from "react-dom";

import { BadgeType, OnClickProps } from "./components/Badge";
import { BadgeComponent } from "./components/Badgelable";


class BootstrapBadge extends WidgetBase {
    // Attributes from modeler
    private attrValue: string;
    private attrStyle: string;
    private attrLabel: string;
    private badgeType: BadgeType;
    private label: string;
    private badgeClass: string;
    private onclickMicroflow: string;
    // Internal variables
    private contextObject: mendix.lib.MxObject;
    private handles: number[];
    // private badgeValue: string;

    createOnClickProps(): OnClickProps {
        return ({
            applyto: "selection",
            guid: this.contextObject.getGuid(),
            microflow: this.onclickMicroflow,
            widgetId: this.id
        });
    }

    postCreate() {
        this.handles = [];
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback: Function) {
        this.contextObject = object;
        this.resetSubscriptions();
        this.updateRendering();

        callback();
    }

    unsubscribe() {
        for (let handle of this.handles) {
            mx.data.unsubscribe(handle);
        }
    }

    private updateRendering() {
        render(createElement(BadgeComponent, {
            MicroflowProps: this.contextObject ? this.createOnClickProps() : "",
            badgeType: this.badgeType,
            badgeValue: this.getValue(this.attrValue, "0"),
            bootstrapStyle: this.getValue(this.attrStyle, this.badgeClass),
            label: this.getValue(this.attrLabel, this.label)
        }), this.domNode);
    }

    private getValue(attributeName: string, defaultValue: string) {
        if (this.contextObject) {
            return this.contextObject.get(attributeName) as string || defaultValue;
        }
        return defaultValue;
    }

    private resetSubscriptions() {
        this.unsubscribe();

        if (this.contextObject) {
            this.handles.push(mx.data.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
            this.handles.push(mx.data.subscribe({
                attr: this.attrValue,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
            this.handles.push(mx.data.subscribe({
                attr: this.attrStyle,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
            this.handles.push(mx.data.subscribe({
                attr: this.attrLabel,
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
        }
    }
}
// Declare widget prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
// tslint:disable : only-arrow-functions
dojoDeclare(
    "com.mendix.widget.BootstrapBadge.BootstrapBadge",
    [ WidgetBase ],
    (function(Source: any) {
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(BootstrapBadge))
);

import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render } from "react-dom";

import { BadgeComponent, OnClickProps } from "./components/Badge";

class BootstrapBadge extends WidgetBase {
    private badgeAttribute: string;
    private bootstrapStyleAttribute: string;
    private labelAttribute: string;
    private badgeType: string;
    private label: string;
    private badgeClass: string;
    private onclickMicroflow: string;

    private contextObject: mendix.lib.MxObject;
    private handles: any[];
    private value: string;

    postCreate() {
        this.handles = [];
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = object;
        this.updateRendering(callback);
        this._resetSubscriptions();
    }

    private updateRendering(callback?: Function) {
        let styleAttribute: string;
        let labelAttribute: string;

        if (this.contextObject) {
            this.value = this.contextObject.get(this.badgeAttribute).toString();

            if (this.contextObject.get(this.bootstrapStyleAttribute)) {
                styleAttribute = this.contextObject.get(this.bootstrapStyleAttribute).toString();
            } else {
                styleAttribute = this.badgeClass;
            }

            if (this.contextObject.get(this.labelAttribute)) {
                labelAttribute = this.contextObject.get(this.labelAttribute).toString();
            } else {
                labelAttribute = this.label;
            }

            render(createElement(BadgeComponent, {
                badgeTypeValue: this.badgeType,
                bootstrapStyle: styleAttribute,
                label: labelAttribute,
                MicroflowProps: this.createOnClickProps(),
                val: this.value
            }), this.domNode);
        }

        if (typeof callback === "function") {
            callback();
        }

    }
    private _unsubscribe() {
        if (this.handles) {
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }
    private _resetSubscriptions() {
        this._unsubscribe();
        if (this.contextObject) {
            this.handles.push(mx.data.subscribe({
                callback: (guid) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
            this.handles.push(mx.data.subscribe({
                attr: this.badgeAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));

            this.handles.push(mx.data.subscribe({
                attr: this.bootstrapStyleAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));

            this.handles.push(mx.data.subscribe({
                attr: this.labelAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
        }
    }

    public createOnClickProps(): OnClickProps {
        return (
            {
                applyto: "selection",
                guid: this.contextObject.getGuid(),
                microflow: this.onclickMicroflow,
                widgetId: this.id
            }
        );
    }
}

let dojoBootstrapBadge = dojoDeclare(
    "BootstrapBadge.widget.BootstrapBadge",
    [WidgetBase],
    (function (Source: any) {
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    } (BootstrapBadge)));

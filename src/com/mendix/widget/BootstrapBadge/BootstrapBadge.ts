import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render } from "react-dom";

import { BadgeComponent } from "./components/Badgelable";
// Does not make your code better, you can ignore the warning...
// tslint:disable-next-line:ordered-imports
import { OnClickProps, BadgeType } from "./components/Badge";

class BootstrapBadge extends WidgetBase {
    // Attributes from modeler
    private attrValue: string;
    private attrStyle: string;
    private attrLabel: string;
    private badgeType: BadgeType;
    private label: string;
    private badgeClass: string;
    private onclickMicroflow: string; // AS: next white line in no need.

    // internal variables // Comments should start with a capital.
    private contextObject: mendix.lib.MxObject;
    private handles: number[];
    private badgeValue: string;

    createOnClickProps(): OnClickProps {
        // The return and open object literal can start on one line. 
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
        this.updateRendering(); // Add white line before function return or callback
        callback();
    }

    unsubscribe() {
        if (this.handles) { // no need to check handles, when initial value of is an empty array, as the for loop for not run and won't give an exception.
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }

    private updateRendering() { // Ternary operator breaking lines should start newline with ? and : (not at the end of the line)
        // let x = conditionStatement
        //      ? value
        //      : elseValue; 
        let attrStyle = this.contextObject ?
            this.getValue(this.contextObject.get(this.attrStyle) as string, this.badgeClass) : this.badgeClass;
        // Use const not let, when variables do not change.
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
        ); // The indent is wrong. It can move this parentheses one line up.
    }
    // Why not take in context as well? It would cleanup your updateRendering greatly
    private getValue(attr: string, otherValue: string) { // Why is this var name named otherValue?
        return attr ? attr : otherValue;
    }

    private resetSubscriptions() {
        this.unsubscribe();

        if (this.contextObject) {
            this.handles.push( mx.data.subscribe({
                callback: (guid) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            ); // The indent is wrong. It can move this parentheses one line up.
            this.handles.push( mx.data.subscribe({
                attr: this.attrValue,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            ); // The indent is wrong. It can move this parentheses one line up. // No need for white line... 

            this.handles.push ( mx.data.subscribe({
                attr: this.attrStyle,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            ); // The indent is wrong. It can move this parentheses one line up. // No need for white line... 

            this.handles.push( mx.data.subscribe ({
                attr: this.attrLabel,
                callback: ( guid, attr, badgeValue ) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            })
            );  // The indent is wrong. It can move this parentheses one line up.
        }
    }
}

// Missing comments why this code is here?
// let dojoBootstrapBadge is not used, so remove it before the statement dojoDeclare()
const dojoBootstrapBadge = dojoDeclare(
    "com.mendix.widget.BootstrapBadge.BootstrapBadge",
    [ WidgetBase ],
    // tslint:disable-next-line:only-arrow-functions
    (function (Source: any) { // no space between function and (
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    } (BootstrapBadge)) // no space between } and (
);

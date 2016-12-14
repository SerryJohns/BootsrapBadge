import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { BadgeButton } from "../BadgeButton";
import { BadgeComponent, BadgeProps, OnClickProps } from "../BadgeComponent";
import { BadgeLabel } from "../BadgeLabel";

import { mockMendix } from "../../../../../../../tests/mocks/Mendix";

describe("Badge", () => {

    xit("should render structure", () => {
        // implement 
    });

    describe("data", () => {

        xit("should render", () => {
            // implement 
        });

        it("should not render if empty", () => {
            // implement 
        });
    });

     describe("text", () => {
        xit("should render", () => {
            // implement 
        });

        it("should not render if empty", () => {
            // implement 
        });
    });


    describe("bootstrap class", () => {
        it("should be success if set style is success", () => {
             // implement 
        });

        it("should not be success if set style is not success", () => {
            // implement 
        });

        it("should be info if set style is info", () => {
            // implement 
        });

        it("should not be info if set style is not info", () => {
            // implement 
        });

        it("should be warning if set style is warning", () => {
            // implement 
        });

        it("should not be warning if set style is not warning", () => {
             // implement 
        });

        it("should be danger if set style is danger", () => {
             // implement 
        });

        it("should not be danger if set style is not danger", () => {
             // implement 
        });
    });

    it("should respond to click event", () => {
        // implement 
    });

    it("should not run onclick event if action name is empty", () => {
        // implement 
    });

    it("should show error to click event", () => {
        // implement 
    });

});
// import { ShallowWrapper, shallow } from "enzyme";
// import { DOM, createElement } from "react";

// import { BadgeButton } from "../BadgeButton";
// import { BadgeProps } from "../BadgeComponent";

// describe("Badge", () => { // TODO: Rename component
//     const createBadge = (props: BadgeProps) => shallow(createElement(BadgeButton, props));
//     let badgeProps: BadgeProps = {
//         badgeValue: "0",
//         label: "Custom label",
//         onClick: jasmine.createSpy("onClick")
//     };

//     describe("of type button", () => {
//         let badgeButton: ShallowWrapper<any, any>;
//         beforeEach(() => {
//             badgeProps.badgeType = "btn";
//             badgeButton = createBadge(badgeProps);
//         });

//         it("should render structure", () => {
//             expect(badgeButton).toBeElement(
//                 DOM.button(
//                     {
//                         className: badgeProps.className,
//                         onClick: jasmine.any(Function) as any
//                     },
//                     DOM.span({ className: "widget-badge-text" }, badgeProps.label),
//                     DOM.span({ className: "badge" }, badgeProps.badgeValue)
//                 )
//             );
//         });

//         it("should respond to click event", () => {
//             badgeButton.simulate("click");

//             expect(badgeProps.onClick).toHaveBeenCalled();
//         });
//     });


//     describe("that is not a button", () => {
//         let badgeButton: ShallowWrapper<any, any>;
//         beforeEach(() => {
//             badgeProps.badgeType = "label";
//             badgeProps.className = "widget-badge-dssd";
//             badgeButton = createBadge(badgeProps);
//         });

//         it("should render structure", () => {
//             expect(badgeButton).toBeElement(
//                 DOM.div(
//                     {
//                         className: "widget-badge-link",
//                         onClick: jasmine.any(Function) as any
//                     },
//                     DOM.span({ className: "widget-badge-text" }, badgeProps.label),
//                     DOM.span({ className: badgeProps.className }, badgeProps.badgeValue)
//                 )
//             );
//         });

//         it("should respond to click event", () => {
//             badgeButton.simulate("click");

//             expect(badgeProps.onClick).toHaveBeenCalled();
//         });
//     });
// });

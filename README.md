### Description

Badges are numerical indicators of how many items are associated with a link.
Labels are used to provide additional information about something:
However, Badges can also be used along with buttons, as demonstrated with the button-badge property.

### Typical usage scenario

 * Showing notifications about a given task.
 * Provide additional information about a specific subject.
 * Can be nested in a button, to provide dynamic information about a given button.
 
### Features and limitations

If any limitation in rendering, it is based Bootstrap (version 3.0.2 in Mendix 6.6)

The widget requires a context object.
Color of the badge/label is based on the bootstrap classes; default, primary, success, info, warning and danger

### Configuration  

Use the following settings:

 * Data source
    * **Bootstrap Style**:(Optional) The attribute that contains the bootstrap class for rendering the badge/label color. This can be a string or an enum.
    * **Data attribute**: The attribute that contains the data to be displayed inside the badge/label.
    * **Label attribute**: (Optional) The attribute that contains the label that preceeds the badge/label.

 * Display
    * **Style**: Value of attribute should be either: default, primary, info, warning, danger annd success.
    * **Type**: This specifies the type of widget that is going to be rendered. It can be either badge, a badge button or a label.
    * **Label**: This is the hard coded value of the label that precedes the badge. However it can be set dynamically from the Label attribute under Data source category.

 * Behaviour
    * **Click MicroFlow**: If set, the MF will be called on click of the Badge, Label or Button

 * Common
    * **Class**: CSS class of the widget

### Bugs & Questions

Please address questions in the Mendix Forum topic:

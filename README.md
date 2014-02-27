# Adjustable number - an AngularJS directive

A small subset of the functionality of the [tangle.js](http://worrydream.com/Tangle/) wrapped into an angularjs directive.

### Usage

Import the module:
```js
angular.module('app', ['adjustable-number'])
```

Instantiate the directive:
```html
<adjustable-number
    num="<model.value>"
    step="<number|value added/subtracted to the number per adjustment>"
    min="<number|the minimum value for the number>"
    max="<number|the maximum value for the number>"
    speed="[integer|smaller values adjusts faster, defaults to 3]"
    numclass="[string|this value is set as the class attribute for the number]"
    inputclass="[string|this value is set as the class attribute for the input (when not in adjustment mode)]"
    cursor="[string|default col-resize]"
>
    [ optional content ]
</adjustable-number>
```

### Note (because it's probably not obvious =) )
The adjustment works by clicking on the number and dragging the mouse.
When the number is double clicked it changes to a input field so that the
number can be set to an exact value.
When the input field is double clicked it goes back to "adjustment mode".
inlineedit-select
=================

An [inlineedit](http://github.com/dominicbarnes/inlineedit) extension that uses
a `<select>` to give the user a set of predefined options.


## Usage:

```html
<span id="user-gender">Male</span>
```

```javascript
var InlineEditSelect = require("inlineedit-select");

var instance = new InlineEditSelect({
    element: "#user-gender",
    options: {
        M: "Male",
        F: "Female"
    },
    submitForm: function (value, done) {
        // perform AJAX and save this value to your database
        // issue the callback w/ an `err` param (node-style) upon failure
    }
});
```

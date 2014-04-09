/**
 * An inlineedit extension that gives a <textarea> as the editing interface.
 *
 * @see http://github.com/dominicbarnes/inlineedit
 *
 * @author Dominic Barnes <dominic@dbarnes.info>
 */

"use strict";

// dependencies
var each = require("foreach");
var InlineEdit = require("inlineedit");
var some = require("some");
var type = require("type");


// single export
module.exports = InlineEdit.extend({
    /**
     * Custom init logic
     */
    initialize: function () {
        if (!this.options) {
            throw new Error("options required");
        } else {
            this.options = normalizeOptions(this.options);
        }

        InlineEdit.prototype.initialize.call(this);
    },

    /**
     * This option is a required parameter. The most robust method is to
     * use an array of objects with label/value properties:
     *
     *   options: [
     *     {
     *       label: "Female",
     *       value: "F"
     *     },
     *     {
     *       label: "Male",
     *       value: "M"
     *     }
     *   ]
     *
     * "value" is required, so if "label" is excluded, the same value
     * will be used for both label and value internally (like a normal
     * <select> would)
     *
     *   options: [
     *     { value: "Female" },
     *     { value: "Male" }
     *   ]
     *
     * However, a shorter syntax is available for flat arrays and simple
     * objects:
     *
     *   options: [ "Female", "Male" ]
     *   options: {
     *     F: "Female",
     *     M: "Male"
     *   }
     *
     * NOTE: the array syntax will use the numeric index as the value,
     *       so if you wish for the label and value to be identical,
     *       use the first syntax (excluding the "value" property)
     */
    options: null,

    /**
     * Retrieves the corresponding option object based on the element's
     * text value. (by default, it is assumed to be the label)
     *
     * @see InlineEdit#parseValue()
     */
    parseValue: function () {
        var fn = InlineEdit.prototype.parseValue;
        var label = fn.apply(this, arguments);

        var option = null;
        some(this.options, function (o) {
            option = o;
            return o.label === label;
        });
        return option;
    },

    /**
     * Sets the element's text value based on the selected option's
     * label property.
     *
     * @see InlineEdit#formatValue()
     */
    formatValue: function (val, el) {
        var label = val.label || val.value;
        InlineEdit.prototype.formatValue.call(this, label, el);
    },

    /**
     * This generates the <select> box used as the primary interface
     *
     * @see InlineEdit#interfaceElement
     */
    interfaceElement: function () {
        var self = this;
        var select = document.createElement("select");

        each(this.options, function (option) {
            select.add(self.generateOption(option));
        });

        return select;
    },

    /**
     * Set the <select> value based on the selectedIndex
     */
    populateForm: function (val, form) {
        form.elements[0].value = val.value || val.label;
    },

    /**
     * Process the form and get the correct option object based on the
     * selected index of the <select>
     *
     * @see InlineEdit#processForm()
     */
    processForm: function (form) {
        return this.options[form.elements[0].selectedIndex];
    },

    /**
     * Helper function for generating an HTML option (allows this to be
     * overridable by developers who need slightly custom behavior)
     *
     * @param {String} key
     * @param {Mixed} value
     * @returns {Option}
     */
    generateOption: function (option) {
        // in case the user decides they want to pass a pre-constructed
        // Option object
        if (option instanceof Option) return option;

        return new Option(option.label || option.value, option.value);
    }
});


// private helpers

function normalizeOptions(options) {
    var ret = [];
    each(options, function (label, value) {
        switch (type(label)) {
        case "element":
        case "object":
            ret.push(label);
            break;

        default:
            ret.push({
                label: label,
                value: value
            });
            break;
        }
    });
    return ret;
}

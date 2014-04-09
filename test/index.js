// dependencies
var expect = require("expect.js");
var InlineEditSelect = require("inlineedit-select");

describe("InlineEditSelect(settings)", function () {
    describe("#generateInterface", function () {
        var prop = InlineEditSelect.prototype.generateInterface;

        it("should be a function by default", function () {
            expect(prop).to.be.a("function");
        });

        it("should create a select element", function () {
            // TODO
        });
    });
});

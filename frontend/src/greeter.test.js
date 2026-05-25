"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var greeter_1 = require("./greeter");
(0, vitest_1.describe)("greet", function () {
    (0, vitest_1.it)("greets a named caller", function () {
        (0, vitest_1.expect)((0, greeter_1.greet)("Titan")).toBe("Hello, Titan!");
    });
    (0, vitest_1.it)("defaults to the world when blank", function () {
        (0, vitest_1.expect)((0, greeter_1.greet)()).toBe("Hello, world!");
        (0, vitest_1.expect)((0, greeter_1.greet)("")).toBe("Hello, world!");
    });
    (0, vitest_1.it)("trims surrounding whitespace", function () {
        (0, vitest_1.expect)((0, greeter_1.greet)("  Ada  ")).toBe("Hello, Ada!");
    });
});

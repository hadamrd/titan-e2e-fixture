"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
/** Domain logic for the Titan e2e sample frontend. */
function greet(name) {
    if (!name || name.trim() === "") {
        return "Hello, world!";
    }
    return "Hello, ".concat(name.trim(), "!");
}

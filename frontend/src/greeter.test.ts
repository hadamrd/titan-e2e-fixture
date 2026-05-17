import { describe, it, expect } from "vitest";
import { greet } from "./greeter";

describe("greet", () => {
  it("greets a named caller", () => {
    expect(greet("Titan")).toBe("Hello, Titan!");
  });

  it("defaults to the world when blank", () => {
    expect(greet()).toBe("Hello, world!");
    expect(greet("")).toBe("Hello, world!");
  });

  it("trims surrounding whitespace", () => {
    expect(greet("  Ada  ")).toBe("Hello, Ada!");
  });
});

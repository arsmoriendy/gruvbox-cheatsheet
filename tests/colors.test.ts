import { expect, test } from "vitest";
import { Stringify } from "../src/data/colors";

test("HSL stringify", () => {
  expect(Stringify({ h: 0, s: 0, l: 0 })).toBe("hsl(0, 0%, 0%)");
});

test("RGB stringify", () => {
  expect(Stringify({ r: 0, g: 0, b: 0 })).toBe("rgb(0.0%, 0.0%, 0.0%)");
});

test("HEX stringify", () => {
  expect(Stringify("#000000")).toBe("#000000");
});

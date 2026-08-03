import { describe, expect, it } from "vitest";
import { number } from "../src/primitive-validators/number.ts";

describe("Number Validator", () => {

    it("accepts positive integer", () => {
        expect(
            number()
                .positive()
                .integer()
                .check(25).ok
        ).toBe(true);
    });

    it("rejects negative", () => {
        expect(() =>
            number()
                .positive()
                .check(-2)
        ).toThrow();
    });

});
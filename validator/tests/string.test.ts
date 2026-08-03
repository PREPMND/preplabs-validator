import { describe, expect, it } from "vitest";
import { string } from "../src/primitive-validators/string.ts";

describe("String Validator", () => {

    it("accepts valid string", () => {
        expect(
            string()
                .min(3)
                .check("Prey").ok
        ).toBe(true);
    });

    it("throws for short string", () => {
        expect(() =>
            string()
                .min(5)
                .check("abc")
        ).toThrow();
    });

    it("throws for number", () => {
        expect(() =>
            string().check(25)
        ).toThrow();
    });

    it("safeCheck returns false", () => {
        expect(
            string()
                .min(5)
                .safeCheck("abc").ok
        ).toBe(false);
    });

});
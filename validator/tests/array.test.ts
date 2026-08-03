import { describe, expect, it } from "vitest";
import { array } from "../src/primitive-validators/array.ts";

describe("Array Validator", () => {

    it("accepts non-empty array", () => {
        expect(
            array()
                .nonEmpty()
                .check([1, 2]).ok
        ).toBe(true);
    });

});
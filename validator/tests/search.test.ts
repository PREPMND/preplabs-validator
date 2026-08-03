import { describe, expect, it } from "vitest";
import { search } from "../src/search/search.ts";

describe("Search Utilities", () => {

    it("startsWith", () => {
        expect(
            search()
                .startsWith("Pre")
                .test("Prey")
        ).toBe(true);
    });

    it("contains", () => {
        expect(
            search()
                .contains("Pre")
                .test("Prey")
        ).toBe(true);
    });

});
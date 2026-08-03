import { describe, expect, it } from "vitest";
import { object } from "../src/primitive-validators/object.ts";

describe("Object Validator", () => {

    it("accepts object", () => {
        expect(
            object()
                .check({ name: "Prey" }).ok
        ).toBe(true);
    });

});
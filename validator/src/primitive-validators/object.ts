import type { objectValidator } from "../types.ts";
class ObjectValidator {
    #strict = false;
    strict(): this {
        this.#strict = true;
        return this;
    }

    check(value: unknown):objectValidator{
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error("Expected an object.");
        }
        return {
            ok: true,
            value
        };
    }
    safeCheck(value: unknown):objectValidator {
        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: {},
                error: err.message
            };
        }
    }

}
export function object() {
    return new ObjectValidator();
}
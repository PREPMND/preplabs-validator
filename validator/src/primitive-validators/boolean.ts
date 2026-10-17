import type { booleanValidator } from "../types.ts";

class BooleanValidator {
    check(value: unknown): booleanValidator {
        if (typeof value !== "boolean") {
            throw new Error("Expected a boolean.");
        }

        return {
            ok: true,
            value
        };
    }

    safeCheck(value: unknown): booleanValidator {
        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: false,
                error: err.message
            };
        }
    }

    isTrue(value: unknown): booleanValidator {
        if (value !== true) {
            throw new Error("Expected true.");
        }

        return {
            ok: true,
            value: true
        };
    }

    isFalse(value: unknown): booleanValidator {
        if (value !== false) {
            throw new Error("Expected false.");
        }

        return {
            ok: true,
            value: false
        };
    }
}

export function boolean() {
    return new BooleanValidator();
}

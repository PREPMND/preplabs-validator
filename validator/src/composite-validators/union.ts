import type { Checkable } from "../types.ts";

class UnionValidator {
    #validators: Checkable[];

    constructor(validators: Checkable[]) {
        this.#validators = validators;
    }

    check(value: unknown): { ok: boolean; value: unknown } {
        const errors: string[] = [];

        for (const validator of this.#validators) {
            const result = validator.safeCheck(value);
            if (result.ok) {
                return { ok: true, value: result.value };
            }
            if (result.error) {
                errors.push(result.error);
            }
        }

        throw new Error(`Value did not match any type in union. Errors: ${errors.join("; ")}`);
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string } {
        try {
            return this.check(value);
        } catch (err: any) {
            return { ok: false, value: undefined, error: err.message };
        }
    }
}

export function union(validators: Checkable[]) {
    return new UnionValidator(validators);
}

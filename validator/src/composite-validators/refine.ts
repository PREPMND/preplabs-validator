import type { Checkable } from "../types.ts";

class RefineValidator {
    #inner: Checkable;
    #fn: (value: unknown) => boolean;
    #message: string;

    constructor(inner: Checkable, fn: (value: unknown) => boolean, message: string) {
        this.#inner = inner;
        this.#fn = fn;
        this.#message = message;
    }

    check(value: unknown): { ok: boolean; value: unknown } {
        const result = this.#inner.check(value);
        if (!this.#fn(result.value)) {
            throw new Error(this.#message);
        }
        return result;
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string } {
        try {
            return this.check(value);
        } catch (err: any) {
            return { ok: false, value, error: err.message };
        }
    }
}

export function refine(validator: Checkable, fn: (value: unknown) => boolean, message: string) {
    return new RefineValidator(validator, fn, message);
}

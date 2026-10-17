import type { Checkable } from "../types.ts";

class OptionalValidator {
    #inner: Checkable;

    constructor(inner: Checkable) {
        this.#inner = inner;
    }

    check(value: unknown): { ok: boolean; value: unknown } {
        if (value === undefined) {
            return { ok: true, value: undefined };
        }
        return this.#inner.check(value);
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string } {
        if (value === undefined) {
            return { ok: true, value: undefined };
        }
        return this.#inner.safeCheck(value);
    }
}

class NullableValidator {
    #inner: Checkable;

    constructor(inner: Checkable) {
        this.#inner = inner;
    }

    check(value: unknown): { ok: boolean; value: unknown } {
        if (value === null) {
            return { ok: true, value: null };
        }
        return this.#inner.check(value);
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string } {
        if (value === null) {
            return { ok: true, value: null };
        }
        return this.#inner.safeCheck(value);
    }
}

export function optional(validator: Checkable) {
    return new OptionalValidator(validator);
}

export function nullable(validator: Checkable) {
    return new NullableValidator(validator);
}

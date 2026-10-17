class LiteralValidator<T extends string | number | boolean> {
    #expected: T;

    constructor(expected: T) {
        this.#expected = expected;
    }

    check(value: unknown): { ok: boolean; value: T } {
        if (value !== this.#expected) {
            throw new Error(`Expected ${JSON.stringify(this.#expected)}, got ${JSON.stringify(value)}.`);
        }
        return { ok: true, value: this.#expected };
    }

    safeCheck(value: unknown): { ok: boolean; value: T; error?: string } {
        try {
            return this.check(value);
        } catch (err: any) {
            return { ok: false, value: this.#expected, error: err.message };
        }
    }
}

export function literal<T extends string | number | boolean>(expected: T) {
    return new LiteralValidator(expected);
}

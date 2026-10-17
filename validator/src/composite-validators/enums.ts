class EnumValidator<T extends string | number> {
    #values: T[];

    constructor(values: T[]) {
        this.#values = values;
    }

    check(value: unknown): { ok: boolean; value: T } {
        if (!this.#values.includes(value as T)) {
            throw new Error(`Expected one of: ${this.#values.map(v => JSON.stringify(v)).join(", ")}.`);
        }
        return { ok: true, value: value as T };
    }

    safeCheck(value: unknown): { ok: boolean; value: T; error?: string } {
        try {
            return this.check(value);
        } catch (err: any) {
            return { ok: false, value: this.#values[0], error: err.message };
        }
    }
}

export function enums<T extends string | number>(values: T[]) {
    return new EnumValidator(values);
}

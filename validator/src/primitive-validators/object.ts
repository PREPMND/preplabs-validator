import type { objectValidator } from "../types.ts";

class ObjectValidator {
    #strict = false;
    #nonEmpty = false;
    #hasKeys?: string[];
    #minKeys?: number;
    #maxKeys?: number;

    strict(): this {
        this.#strict = true;
        return this;
    }

    nonEmpty(): this {
        this.#nonEmpty = true;
        return this;
    }

    hasKeys(keys: string[]): this {
        this.#hasKeys = keys;
        return this;
    }

    minKeys(count: number): this {
        this.#minKeys = count;
        return this;
    }

    maxKeys(count: number): this {
        this.#maxKeys = count;
        return this;
    }

    check(value: unknown): objectValidator {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error("Expected an object.");
        }

        const keys = Object.keys(value);

        if (this.#nonEmpty && keys.length === 0) {
            throw new Error("Object must not be empty.");
        }

        if (this.#minKeys !== undefined && keys.length < this.#minKeys) {
            throw new Error(`Object must have at least ${this.#minKeys} keys.`);
        }

        if (this.#maxKeys !== undefined && keys.length > this.#maxKeys) {
            throw new Error(`Object must have at most ${this.#maxKeys} keys.`);
        }

        if (this.#hasKeys) {
            for (const key of this.#hasKeys) {
                if (!(key in value)) {
                    throw new Error(`Object must have key "${key}".`);
                }
            }
        }

        return {
            ok: true,
            value
        };
    }

    safeCheck(value: unknown): objectValidator {
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

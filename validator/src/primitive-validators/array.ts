import type { arrayValidator } from "../types.ts";

class ArrayValidator<T> {
    #minLength?: number;
    #maxLength?: number;
    #nonEmpty = false;
    #unique = false;
    #includes?: T;
    #every?: (item: unknown) => boolean;
    #everyName?: string;

    min(length: number): this {
        this.#minLength = length;
        return this;
    }

    max(length: number): this {
        this.#maxLength = length;
        return this;
    }

    nonEmpty(): this {
        this.#nonEmpty = true;
        return this;
    }

    unique(): this {
        this.#unique = true;
        return this;
    }

    includes(item: T): this {
        this.#includes = item;
        return this;
    }

    every(fn: (item: unknown) => boolean, name?: string): this {
        this.#every = fn;
        this.#everyName = name;
        return this;
    }

    ofStrings(): this {
        this.#every = (item) => typeof item === "string";
        this.#everyName = "string";
        return this;
    }

    ofNumbers(): this {
        this.#every = (item) => typeof item === "number" && !Number.isNaN(item);
        this.#everyName = "number";
        return this;
    }

    ofBooleans(): this {
        this.#every = (item) => typeof item === "boolean";
        this.#everyName = "boolean";
        return this;
    }

    check(value: unknown): arrayValidator<T> {
        if (!Array.isArray(value)) {
            throw new Error("Expected an array.");
        }

        if (this.#nonEmpty && value.length === 0) {
            throw new Error("Array cannot be empty.");
        }

        if (this.#minLength !== undefined && value.length < this.#minLength) {
            throw new Error(`Minimum array length is ${this.#minLength}.`);
        }

        if (this.#maxLength !== undefined && value.length > this.#maxLength) {
            throw new Error(`Maximum array length is ${this.#maxLength}.`);
        }

        if (this.#unique) {
            const set = new Set(value);
            if (set.size !== value.length) {
                throw new Error("Array must contain unique elements.");
            }
        }

        if (this.#includes !== undefined && !value.includes(this.#includes)) {
            throw new Error(`Array must include ${JSON.stringify(this.#includes)}.`);
        }

        if (this.#every) {
            for (let i = 0; i < value.length; i++) {
                if (!this.#every(value[i])) {
                    throw new Error(`Array element at index ${i} failed ${this.#everyName ?? "custom"} check.`);
                }
            }
        }

        return {
            ok: true,
            value
        };
    }

    safeCheck(value: unknown): arrayValidator<T> {
        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: [],
                error: err.message
            };
        }
    }
}

export function array<T>() {
    return new ArrayValidator<T>();
}

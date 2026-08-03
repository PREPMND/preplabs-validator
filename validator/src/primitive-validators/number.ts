import type { numberValidator } from "../types.ts";

class NumberValidator {

    #min?: number;
    #max?: number;
    #integer = false;
    #positive = false;
    #negative = false;

    min(value: number): this {
        this.#min = value;
        return this;
    }
    max(value: number): this {
        this.#max = value;
        return this;
    }
    integer(): this {
        this.#integer = true;
        return this;
    }
    positive(): this {
        this.#positive = true;
        return this;
    }
    negative(): this {
        this.#negative = true;
        return this;
    }

    check(value: unknown): numberValidator {
        if (typeof value !== "number") {
            throw new Error("Expected a number.");
        }

        if (this.#integer && !Number.isInteger(value)) {
            throw new Error("Expected an integer.");
        }

        if (this.#positive && value <= 0) {
            throw new Error("Expected a positive number.");
        }

        if (this.#negative && value >= 0) {
            throw new Error("Expected a negative number.");
        }

        if (this.#min !== undefined && value < this.#min) {
            throw new Error(`Minimum value is ${this.#min}`);
        }

        if (this.#max !== undefined && value > this.#max) {
            throw new Error(`Maximum value is ${this.#max}`);
        }

        return {
            ok: true,
            value
        };
    }

    safeCheck(value: unknown): numberValidator {

        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: 0,
                error: err.message
            };
        }

    }

    age(value: unknown) {
        return this
            .integer()
            .min(0)
            .max(150)
            .check(value);
    }

    percentage(value: unknown) {
        return this
            .min(0)
            .max(100)
            .check(value);
    }

}
export function number() {
    return new NumberValidator();
}
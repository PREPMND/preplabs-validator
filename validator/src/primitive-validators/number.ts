import type { numberValidator } from "../types.ts";

class NumberValidator {
    #min?: number;
    #max?: number;
    #integer = false;
    #positive = false;
    #negative = false;
    #finite = false;
    #safe = false;
    #multipleOf?: number;
    #oneOf?: number[];

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

    finite(): this {
        this.#finite = true;
        return this;
    }

    safe(): this {
        this.#safe = true;
        return this;
    }

    multipleOf(divisor: number): this {
        this.#multipleOf = divisor;
        return this;
    }

    oneOf(values: number[]): this {
        this.#oneOf = values;
        return this;
    }

    check(value: unknown): numberValidator {
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new Error("Expected a number.");
        }

        if (this.#finite && !Number.isFinite(value)) {
            throw new Error("Expected a finite number.");
        }

        if (this.#safe && !Number.isSafeInteger(value)) {
            throw new Error("Expected a safe integer.");
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
            throw new Error(`Minimum value is ${this.#min}.`);
        }

        if (this.#max !== undefined && value > this.#max) {
            throw new Error(`Maximum value is ${this.#max}.`);
        }

        if (this.#multipleOf !== undefined && value % this.#multipleOf !== 0) {
            throw new Error(`Expected a multiple of ${this.#multipleOf}.`);
        }

        if (this.#oneOf && !this.#oneOf.includes(value)) {
            throw new Error(`Number must be one of: ${this.#oneOf.join(", ")}.`);
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

    port(value: unknown) {
        return this
            .integer()
            .min(0)
            .max(65535)
            .check(value);
    }

    latitude(value: unknown) {
        return this
            .min(-90)
            .max(90)
            .check(value);
    }

    longitude(value: unknown) {
        return this
            .min(-180)
            .max(180)
            .check(value);
    }

    httpStatus(value: unknown) {
        return this
            .integer()
            .min(100)
            .max(599)
            .check(value);
    }
}

export function number() {
    return new NumberValidator();
}

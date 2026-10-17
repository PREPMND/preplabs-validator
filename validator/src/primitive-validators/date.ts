import type { dateValidator } from "../types.ts";

class DateValidator {
    #before?: Date;
    #after?: Date;
    #future = false;
    #past = false;

    before(date: Date): this {
        this.#before = date;
        return this;
    }

    after(date: Date): this {
        this.#after = date;
        return this;
    }

    future(): this {
        this.#future = true;
        return this;
    }

    past(): this {
        this.#past = true;
        return this;
    }

    check(value: unknown): dateValidator {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error("Expected a valid Date.");
        }

        const now = new Date();

        if (this.#future && value <= now) {
            throw new Error("Date must be in the future.");
        }

        if (this.#past && value >= now) {
            throw new Error("Date must be in the past.");
        }

        if (this.#before && value > this.#before) {
            throw new Error("Date should be before the given date.");
        }

        if (this.#after && value < this.#after) {
            throw new Error("Date should be after the given date.");
        }

        return {
            ok: true,
            value
        };
    }

    safeCheck(value: unknown): dateValidator {
        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: new Date(0),
                error: err.message
            };
        }
    }
}

export function date() {
    return new DateValidator();
}

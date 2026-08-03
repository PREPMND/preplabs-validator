class DateValidator {

    before(date: Date): this {
        this.#before = date;
        return this;
    }

    after(date: Date): this {
        this.#after = date;
        return this;
    }

    #before?: Date;
    #after?: Date;

    check(value: unknown) {

        if (!(value instanceof Date)) {
            throw new Error("Expected a Date.");
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

}

export function date() {
    return new DateValidator();
}
class NumberValidator {
    #min;
    #max;
    #integer = false;
    #positive = false;
    #negative = false;
    min(value) {
        this.#min = value;
        return this;
    }
    max(value) {
        this.#max = value;
        return this;
    }
    integer() {
        this.#integer = true;
        return this;
    }
    positive() {
        this.#positive = true;
        return this;
    }
    negative() {
        this.#negative = true;
        return this;
    }
    check(value) {
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
    safeCheck(value) {
        try {
            return this.check(value);
        }
        catch (err) {
            return {
                ok: false,
                value: 0,
                error: err.message
            };
        }
    }
    age(value) {
        return this
            .integer()
            .min(0)
            .max(150)
            .check(value);
    }
    percentage(value) {
        return this
            .min(0)
            .max(100)
            .check(value);
    }
}
export function number() {
    return new NumberValidator();
}

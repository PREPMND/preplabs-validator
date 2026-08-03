class ArrayValidator {
    #minLength;
    #maxLength;
    #nonEmpty = false;
    min(length) {
        this.#minLength = length;
        return this;
    }
    max(length) {
        this.#maxLength = length;
        return this;
    }
    nonEmpty() {
        this.#nonEmpty = true;
        return this;
    }
    check(value) {
        if (!Array.isArray(value)) {
            throw new Error("Expected an array.");
        }
        if (this.#nonEmpty && value.length === 0) {
            throw new Error("Array cannot be empty.");
        }
        if (this.#minLength !== undefined && value.length < this.#minLength) {
            throw new Error(`Minimum array length is ${this.#minLength}`);
        }
        if (this.#maxLength !== undefined && value.length > this.#maxLength) {
            throw new Error(`Maximum array length is ${this.#maxLength}`);
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
                value: [],
                error: err.message
            };
        }
    }
}
export function array() {
    return new ArrayValidator();
}

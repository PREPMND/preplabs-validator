class ObjectValidator {
    #strict = false;
    strict() {
        this.#strict = true;
        return this;
    }
    check(value) {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error("Expected an object.");
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
                value: {},
                error: err.message
            };
        }
    }
}
export function object() {
    return new ObjectValidator();
}

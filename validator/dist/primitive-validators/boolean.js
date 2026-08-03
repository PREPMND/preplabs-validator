class BooleanValidator {
    check(value) {
        if (typeof value !== "boolean") {
            throw new Error("Expected a boolean.");
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
                value: false,
                error: err.message
            };
        }
    }
    isTrue(value) {
        if (value !== true) {
            throw new Error("Expected true.");
        }
        return {
            ok: true,
            value: true
        };
    }
    isFalse(value) {
        if (value !== false) {
            throw new Error("Expected false.");
        }
        return {
            ok: true,
            value: false
        };
    }
}
export function boolean() {
    return new BooleanValidator();
}

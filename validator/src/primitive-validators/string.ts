import type { stringValidator } from "../types.ts";
class StringValidator {
    #minLength?: number;
    #maxLength?: number;
    #startsWith?: string;
    #endsWith?: string;
    #contains?: string;
    //using private or # to store minLength and maxLength to avoid exposing them to the user of the library. This is a common practice in TypeScript to encapsulate the internal state of a class and prevent external code from directly modifying it.
    //# not only protects variable change in index.ts but also with anyone running pure js i.e. from browsers so hence better than private. also it doesnt disappear after compiler time unlike prviate which is not for native js and is only present till compilation and not in runtime
    min(length: number): this {
        if (typeof length !== "number") {
            throw new Error("Passed value was not a number ,min() should work with a number.")
        }
        this.#minLength = length;
        return this;
    }

    max(length: number): this {
        if (typeof length !== "number") {
            throw new Error("Passed value was not a number ,max() should work with a number.")
        }
        this.#maxLength = length;
        return this;
    }
    startsWith(prefix: string): this {
        this.#startsWith = prefix;
        return this;
    }

    endsWith(suffix: string): this {
        this.#endsWith = suffix;
        return this;
    }

    contains(text: string): this {
        this.#contains = text;
        return this;
    }
    check(value: unknown): stringValidator {
        if (typeof value !== "string") {
            throw new Error("Passed value was not a string ,check() should work with a string.")
        }

        if (this.#minLength !== undefined && value.length < this.#minLength) {
            throw new Error(`String length is less than the minimum length of ${this.#minLength}.`);
        }
        if (this.#maxLength !== undefined && value.length > this.#maxLength) {
            throw new Error(`String length is greater than the maximum length of ${this.#maxLength}.`);
        }
        if (this.#startsWith && !value.startsWith(this.#startsWith)) {
            throw new Error(`String must start with "${this.#startsWith}".`);
        }

        if (this.#endsWith && !value.endsWith(this.#endsWith)) {
            throw new Error(`String must end with "${this.#endsWith}".`);
        }

        if (this.#contains && !value.includes(this.#contains)) {
            throw new Error(`String must contain "${this.#contains}".`);
        }
        return {
            value,
            ok: true,
        }
    }

    safeCheck(value: unknown): stringValidator {
        try {
            return this.check(value);
        } catch (error: any) {
            return {
                value: typeof value === "string" ? value : "",
                ok: false,
                wasAString: typeof value === "string",
                error: error.message
            };
        }
    }

    user(value: unknown): stringValidator {
        return this
            .min(5)
            .max(20)
            .check(value);
    }

    safeUser(value: unknown): stringValidator {
        try {
            return this.user(value);
        } catch (error: any) {
            return {
                value: typeof value === "string" ? (value as string).trim() : "",
                ok: false,
                wasAString: typeof value === "string",
                error: error.message
            };
        }
    }
    psw(value: unknown): stringValidator {
        if (typeof value !== "string") {
            throw new Error("Passed value was not a string ,password() should work with a string.")
        }
        const val = value.trim();
        if (val == undefined || val.length < 8 || val.length > 20) {
            throw new Error("Value should be string, and string length should be greater than 7 and less than 20");
        }
        return {
            value: val,
            ok: true,
        }
    }
    safePsw(value: unknown): stringValidator {
        try {
            return this.psw(value);
        } catch (error: any) {
            return {
                value: typeof value === "string" ? (value as string).trim() : "",
                ok: false,
                wasAString: typeof value === "string",
                error: error.message
            };
        }
    }
}
export function string() {
    return new StringValidator;
}


//1. Private vs public

// // 1. They use your builder method correctly
// validator.min(5); // Internal state: minLength is now 5

// // 2. BUT they can type this anywhere else in their file:
// validator.minLength = -999;
// Use code with caution.How did they change it? They just typed .minLength = -999. Because it is public, JavaScript allows them to overwrite your internal library memory directly from their own file. Your validator is now broken.
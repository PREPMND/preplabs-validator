import type { stringValidator } from "../types.ts";
import { EMAIL_REGEX, USERNAME_REGEX, UUID_REGEX, PHONE_REGEX, IPV4_REGEX, HEX_COLOR_REGEX, SLUG_REGEX } from "../utlities/regex.ts";

class StringValidator {
    #minLength?: number;
    #maxLength?: number;
    #startsWith?: string;
    #endsWith?: string;
    #contains?: string;
    #pattern?: RegExp;
    #patternName?: string;
    #trimmed = false;
    #lowercased = false;
    #uppercased = false;
    #nonEmpty = false;
    #oneOf?: string[];

    min(length: number): this {
        if (typeof length !== "number") {
            throw new Error("Passed value was not a number, min() should work with a number.");
        }
        this.#minLength = length;
        return this;
    }

    max(length: number): this {
        if (typeof length !== "number") {
            throw new Error("Passed value was not a number, max() should work with a number.");
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

    trim(): this {
        this.#trimmed = true;
        return this;
    }

    lowercase(): this {
        this.#lowercased = true;
        return this;
    }

    uppercase(): this {
        this.#uppercased = true;
        return this;
    }

    nonEmpty(): this {
        this.#nonEmpty = true;
        return this;
    }

    regex(pattern: RegExp, name?: string): this {
        this.#pattern = pattern;
        this.#patternName = name;
        return this;
    }

    oneOf(values: string[]): this {
        this.#oneOf = values;
        return this;
    }

    email(): this {
        this.#pattern = EMAIL_REGEX;
        this.#patternName = "email";
        return this;
    }

    url(): this {
        this.#pattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
        this.#patternName = "URL";
        return this;
    }

    uuid(): this {
        this.#pattern = UUID_REGEX;
        this.#patternName = "UUID";
        return this;
    }

    phone(): this {
        this.#pattern = PHONE_REGEX;
        this.#patternName = "phone number";
        return this;
    }

    ipv4(): this {
        this.#pattern = IPV4_REGEX;
        this.#patternName = "IPv4 address";
        return this;
    }

    hexColor(): this {
        this.#pattern = HEX_COLOR_REGEX;
        this.#patternName = "hex color";
        return this;
    }

    slug(): this {
        this.#pattern = SLUG_REGEX;
        this.#patternName = "slug";
        return this;
    }

    alphanumeric(): this {
        this.#pattern = USERNAME_REGEX;
        this.#patternName = "alphanumeric";
        return this;
    }

    numeric(): this {
        this.#pattern = /^[0-9]+$/;
        this.#patternName = "numeric string";
        return this;
    }

    alpha(): this {
        this.#pattern = /^[a-zA-Z]+$/;
        this.#patternName = "alphabetic";
        return this;
    }

    json(): this {
        this.#pattern = undefined;
        this.#patternName = "JSON";
        return this;
    }

    base64(): this {
        this.#pattern = /^[A-Za-z0-9+/]*={0,2}$/;
        this.#patternName = "base64";
        return this;
    }

    creditCard(): this {
        this.#pattern = /^\d{13,19}$/;
        this.#patternName = "credit card number";
        return this;
    }

    jwt(): this {
        this.#pattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
        this.#patternName = "JWT";
        return this;
    }

    cuid(): this {
        this.#pattern = /^c[a-z0-9]{24}$/;
        this.#patternName = "CUID";
        return this;
    }

    semver(): this {
        this.#pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
        this.#patternName = "semver";
        return this;
    }

    check(value: unknown): stringValidator {
        if (typeof value !== "string") {
            throw new Error("Passed value was not a string, check() should work with a string.");
        }

        let val = value;

        if (this.#trimmed) val = val.trim();

        if (this.#nonEmpty && val.length === 0) {
            throw new Error("String must not be empty.");
        }

        if (this.#minLength !== undefined && val.length < this.#minLength) {
            throw new Error(`String length is less than the minimum length of ${this.#minLength}.`);
        }
        if (this.#maxLength !== undefined && val.length > this.#maxLength) {
            throw new Error(`String length is greater than the maximum length of ${this.#maxLength}.`);
        }
        if (this.#startsWith && !val.startsWith(this.#startsWith)) {
            throw new Error(`String must start with "${this.#startsWith}".`);
        }
        if (this.#endsWith && !val.endsWith(this.#endsWith)) {
            throw new Error(`String must end with "${this.#endsWith}".`);
        }
        if (this.#contains && !val.includes(this.#contains)) {
            throw new Error(`String must contain "${this.#contains}".`);
        }

        if (this.#lowercased && val !== val.toLowerCase()) {
            throw new Error("String must be lowercase.");
        }
        if (this.#uppercased && val !== val.toUpperCase()) {
            throw new Error("String must be uppercase.");
        }

        if (this.#oneOf && !this.#oneOf.includes(val)) {
            throw new Error(`String must be one of: ${this.#oneOf.join(", ")}.`);
        }

        if (this.#patternName === "JSON") {
            try {
                JSON.parse(val);
            } catch {
                throw new Error("String must be valid JSON.");
            }
        } else if (this.#pattern && !this.#pattern.test(val)) {
            throw new Error(`String must be a valid ${this.#patternName ?? "format"}.`);
        }

        return {
            value: val,
            ok: true,
        };
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
            throw new Error("Passed value was not a string, password() should work with a string.");
        }
        const val = value.trim();
        if (val == undefined || val.length < 8 || val.length > 20) {
            throw new Error("Value should be string, and string length should be greater than 7 and less than 20");
        }
        return {
            value: val,
            ok: true,
        };
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
    return new StringValidator();
}

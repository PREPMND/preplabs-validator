import type { schemaResult, Checkable } from "../types.ts";

type Shape = Record<string, Checkable>;

class SchemaValidator {
    #shape: Shape;
    #strict = false;

    constructor(shape: Shape) {
        this.#shape = shape;
    }

    strict(): this {
        this.#strict = true;
        return this;
    }

    check(value: unknown): schemaResult {
        if (typeof value !== "object" || value === null || Array.isArray(value)) {
            throw new Error("Expected an object.");
        }

        const data = value as Record<string, unknown>;
        const result: Record<string, unknown> = {};
        const errors: Record<string, string> = {};

        if (this.#strict) {
            const extraKeys = Object.keys(data).filter(k => !(k in this.#shape));
            if (extraKeys.length > 0) {
                throw new Error(`Unexpected keys: ${extraKeys.join(", ")}.`);
            }
        }

        for (const [key, validator] of Object.entries(this.#shape)) {
            const fieldValue = data[key];

            if (fieldValue === undefined) {
                errors[key] = `Missing required field "${key}".`;
                continue;
            }

            const fieldResult = validator.safeCheck(fieldValue);

            if (fieldResult.ok) {
                result[key] = fieldResult.value;
            } else {
                errors[key] = fieldResult.error ?? `Validation failed for "${key}".`;
            }
        }

        if (Object.keys(errors).length > 0) {
            return {
                ok: false,
                value: result,
                errors
            };
        }

        return {
            ok: true,
            value: result
        };
    }

    safeCheck(value: unknown): schemaResult {
        try {
            return this.check(value);
        } catch (err: any) {
            return {
                ok: false,
                value: {},
                errors: { _root: err.message }
            };
        }
    }

    extend(extra: Shape): SchemaValidator {
        return new SchemaValidator({ ...this.#shape, ...extra });
    }

    pick(keys: string[]): SchemaValidator {
        const picked: Shape = {};
        for (const key of keys) {
            if (key in this.#shape) {
                picked[key] = this.#shape[key];
            }
        }
        return new SchemaValidator(picked);
    }

    omit(keys: string[]): SchemaValidator {
        const omitted: Shape = {};
        for (const [key, val] of Object.entries(this.#shape)) {
            if (!keys.includes(key)) {
                omitted[key] = val;
            }
        }
        return new SchemaValidator(omitted);
    }

    merge(other: SchemaValidator): SchemaValidator {
        return new SchemaValidator({ ...this.#shape, ...other.#shape });
    }

    get keys(): string[] {
        return Object.keys(this.#shape);
    }
}

export function schema(shape: Shape) {
    return new SchemaValidator(shape);
}

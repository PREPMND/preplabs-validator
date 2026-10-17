import type { Checkable } from "../types.ts";

class TupleValidator {
    #items: Checkable[];

    constructor(items: Checkable[]) {
        this.#items = items;
    }

    check(value: unknown): { ok: boolean; value: unknown[] } {
        if (!Array.isArray(value)) {
            throw new Error("Expected an array (tuple).");
        }

        if (value.length !== this.#items.length) {
            throw new Error(`Expected tuple of length ${this.#items.length}, got ${value.length}.`);
        }

        const result: unknown[] = [];

        for (let i = 0; i < this.#items.length; i++) {
            const itemResult = this.#items[i].check(value[i]);
            result.push(itemResult.value);
        }

        return { ok: true, value: result };
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown[]; error?: string } {
        try {
            return this.check(value);
        } catch (err: any) {
            return { ok: false, value: [], error: err.message };
        }
    }
}

export function tuple(items: Checkable[]) {
    return new TupleValidator(items);
}

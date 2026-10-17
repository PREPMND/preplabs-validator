import type { Checkable } from "../types.ts";

type AsyncCheckFn = (value: unknown) => Promise<boolean>;

class AsyncValidator {
    #inner: Checkable;
    #checks: { fn: AsyncCheckFn; message: string }[] = [];

    constructor(inner: Checkable) {
        this.#inner = inner;
    }

    addCheck(fn: AsyncCheckFn, message: string): this {
        this.#checks.push({ fn, message });
        return this;
    }

    async check(value: unknown): Promise<{ ok: boolean; value: unknown }> {
        const syncResult = this.#inner.check(value);

        for (const { fn, message } of this.#checks) {
            const passed = await fn(syncResult.value);
            if (!passed) {
                throw new Error(message);
            }
        }

        return syncResult;
    }

    async safeCheck(value: unknown): Promise<{ ok: boolean; value: unknown; error?: string }> {
        try {
            return await this.check(value);
        } catch (err: any) {
            return { ok: false, value, error: err.message };
        }
    }
}

export function async(validator: Checkable) {
    return new AsyncValidator(validator);
}

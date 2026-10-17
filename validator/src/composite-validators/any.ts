class AnyValidator {
    check(value: unknown): { ok: boolean; value: unknown } {
        return { ok: true, value };
    }

    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string } {
        return { ok: true, value };
    }
}

export function any() {
    return new AnyValidator();
}

declare class BooleanValidator {
    check(value: unknown): {
        ok: boolean;
        value: boolean;
    };
    safeCheck(value: unknown): {
        ok: boolean;
        value: boolean;
    } | {
        ok: boolean;
        value: boolean;
        error: any;
    };
    isTrue(value: unknown): {
        ok: boolean;
        value: boolean;
    };
    isFalse(value: unknown): {
        ok: boolean;
        value: boolean;
    };
}
export declare function boolean(): BooleanValidator;
export {};

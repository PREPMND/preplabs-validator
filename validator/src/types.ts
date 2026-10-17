export interface stringValidator {
    value: string;
    ok: boolean;
    wasAString?: boolean;
    error?: string;
}

export interface numberValidator {
    value: number;
    ok: boolean;
    error?: string;
}

export interface objectValidator {
    value: object;
    ok: boolean;
    error?: string;
}

export interface arrayValidator<T> {
    value: T[];
    ok: boolean;
    error?: string;
}

export interface booleanValidator {
    value: boolean;
    ok: boolean;
    error?: string;
}

export interface dateValidator {
    value: Date;
    ok: boolean;
    error?: string;
}

export interface schemaResult {
    ok: boolean;
    value: Record<string, unknown>;
    errors?: Record<string, string>;
}

export interface Checkable {
    check(value: unknown): { ok: boolean; value: unknown };
    safeCheck(value: unknown): { ok: boolean; value: unknown; error?: string };
}

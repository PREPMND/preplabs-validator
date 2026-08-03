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

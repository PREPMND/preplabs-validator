import type { stringValidator } from "../types.ts";
declare class StringValidator {
    #private;
    min(length: number): this;
    max(length: number): this;
    startsWith(prefix: string): this;
    endsWith(suffix: string): this;
    contains(text: string): this;
    check(value: unknown): stringValidator;
    safeCheck(value: unknown): stringValidator;
    user(value: unknown): stringValidator;
    safeUser(value: unknown): stringValidator;
    psw(value: unknown): stringValidator;
    safePsw(value: unknown): stringValidator;
}
export declare function string(): StringValidator;
export {};

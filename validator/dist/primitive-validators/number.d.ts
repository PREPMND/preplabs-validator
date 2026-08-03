import type { numberValidator } from "../types.ts";
declare class NumberValidator {
    #private;
    min(value: number): this;
    max(value: number): this;
    integer(): this;
    positive(): this;
    negative(): this;
    check(value: unknown): numberValidator;
    safeCheck(value: unknown): numberValidator;
    age(value: unknown): numberValidator;
    percentage(value: unknown): numberValidator;
}
export declare function number(): NumberValidator;
export {};

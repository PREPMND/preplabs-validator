import type { arrayValidator } from "../types.ts";
declare class ArrayValidator<T> {
    #private;
    min(length: number): this;
    max(length: number): this;
    nonEmpty(): this;
    check(value: unknown): arrayValidator<T>;
    safeCheck(value: unknown): arrayValidator<T>;
}
export declare function array<T>(): ArrayValidator<T>;
export {};

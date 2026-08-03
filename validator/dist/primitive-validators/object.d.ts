import type { objectValidator } from "../types.ts";
declare class ObjectValidator {
    #private;
    strict(): this;
    check(value: unknown): objectValidator;
    safeCheck(value: unknown): objectValidator;
}
export declare function object(): ObjectValidator;
export {};

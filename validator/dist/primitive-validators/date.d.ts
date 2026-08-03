declare class DateValidator {
    #private;
    before(date: Date): this;
    after(date: Date): this;
    check(value: unknown): {
        ok: boolean;
        value: Date;
    };
}
export declare function date(): DateValidator;
export {};

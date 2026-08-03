export declare class Search {
    #private;
    ignoreCase(): this;
    caseSensitive(): this;
    contains(value: string): RegExp;
    startsWith(value: string): RegExp;
    endsWith(value: string): RegExp;
    exact(value: string): RegExp;
}
export declare function search(): Search;

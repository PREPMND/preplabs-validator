export * from "./primitive-validators/string.ts";
export * from "./primitive-validators/number.ts";
export * from "./primitive-validators/object.ts";
export * from "./primitive-validators/array.ts";
export * from "./primitive-validators/boolean.ts";
export * from "./primitive-validators/date.ts";
export * from "./search/search.ts";

export * from "./types.ts";
// const check=string().min(3);
// console.log(check.check("tjkddjnbghvjbnk"));

// console.log(string().safeUser("prepfh"));
// console.log(string().safePsw(123));
// console.log(string().endsWith("hello").startsWith("e").safeCheck("hello"));
// console.log(search()
//     .caseSensitive()
//     .contains("prep"));
import { search } from "./search/search.ts";
const regex = search().contains("rep");

console.log(regex);
console.log(regex.test("Prey"));
console.log(regex.test("prey"));
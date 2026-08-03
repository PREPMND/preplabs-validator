export * from "./primitive-validators/string.js";
export * from "./primitive-validators/number.js";
export * from "./primitive-validators/object.js";
export * from "./primitive-validators/array.js";
export * from "./primitive-validators/boolean.js";
export * from "./primitive-validators/date.js";
export * from "./search/search.js";
export * from "./types.js";
// const check=string().min(3);
// console.log(check.check("tjkddjnbghvjbnk"));
// console.log(string().safeUser("prepfh"));
// console.log(string().safePsw(123));
// console.log(string().endsWith("hello").startsWith("e").safeCheck("hello"));
// console.log(search()
//     .caseSensitive()
//     .contains("prep"));
import { search } from "./search/search.js";
const regex = search().contains("rep");
console.log(regex);
console.log(regex.test("Prey"));
console.log(regex.test("prey"));

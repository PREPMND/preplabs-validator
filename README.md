# @preplabs/validator

A lightweight, TypeScript-first validation library with a simple fluent API.

Built for common validation needs without requiring runtime dependencies.

## Features

- Fluent / builder-style API
- TypeScript-first
- String validation
- Number validation
- Boolean validation
- Array validation
- Object validation
- Date validation
- Exception-based validation with `check()`
- Safe validation with `safeCheck()`
- Regex and search utilities
- Zero runtime dependencies

## Installation

```bash
npm install @preplabs/validator
```

## Quick Start

```ts
import { string } from "@preplabs/validator";

const result = string()
    .min(3)
    .max(20)
    .check("Prey");

console.log(result);
```

## String Validation

```ts
import { string } from "@preplabs/validator";

const result = string()
    .min(3)
    .max(20)
    .check("Prey");
```

For validation that throws errors:

```ts
string()
    .min(3)
    .max(20)
    .check("Hi");
```

For safe validation:

```ts
const result = string()
    .min(3)
    .safeCheck("Hi");

console.log(result);
```

## Number Validation

```ts
import { number } from "@preplabs/validator";

const result = number()
    .min(18)
    .max(100)
    .check(21);
```

## Boolean Validation

```ts
import { boolean } from "@preplabs/validator";

const result = boolean().check(true);
```

## Array Validation

```ts
import { array } from "@preplabs/validator";

const result = array().check([
    "TypeScript",
    "JavaScript"
]);
```

## Object Validation

```ts
import { object } from "@preplabs/validator";

const result = object().check({
    name: "Prey",
    age: 21
});
```

## Date Validation

```ts
import { date } from "@preplabs/validator";

const result = date().check(new Date());
```

## Safe Validation

Use `safeCheck()` when you want validation results instead of thrown errors.

```ts
const result = string()
    .min(5)
    .safeCheck("Hi");

console.log(result);
```

Example result:

```ts
{
    value: "Hi",
    ok: false,
    error: "String length is less than the minimum length of 5."
}
```

## Search and Regex Utilities

The package also includes simple search utilities for creating regular expressions.

```ts
import { search } from "@preplabs/validator";

const regex = search()
    .contains("pre");

console.log(regex.test("Prey"));
```

Other available search methods:

```ts
search().contains("pre");

search().startsWith("pre");

search().endsWith("labs");

search().exact("Prey");
```

Case-insensitive search is enabled by default.

```ts
search()
    .caseSensitive()
    .contains("Pre");
```

## Why @preplabs/validator?

The goal of this package is to provide a small and straightforward validation API for common use cases.

```ts
string()
    .min(3)
    .max(20)
    .check(value);
```

No database integration, framework dependency, or runtime dependencies are required.

## TypeScript Support

The package is written in TypeScript and includes type declarations.

```ts
import { string, number, array } from "@preplabs/validator";
```

## Contributing

Contributions, feature requests, and feedback are welcome.

Please check [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a Pull Request.

## License

MIT

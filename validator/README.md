# @preplabs/validator

> A lightweight, TypeScript-first validation library focused on common backend validation.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)]()
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

## Features

- 🚀 Lightweight
- ⚡ Zero runtime dependencies
- 🔒 TypeScript-first
- 📦 ESM support
- ✅ Fluent API
- 🧩 Built-in validators
- 🔍 Regex search utilities

---

## Installation

```bash
npm install @preplabs/validator
```

---

## Basic Usage

```ts
import { string, number } from "@preplabs/validator";

string()
    .min(3)
    .max(20)
    .check("Prey");

number()
    .positive()
    .integer()
    .check(25);
```

---

## Username Validation

```ts
import { string } from "@preplabs/validator";

string().user("Prey123");
```

---

## Password Validation

```ts
string().psw("MyPassword123!");
```

---

## Safe Validation

```ts
const result = string()
    .min(5)
    .safeCheck("abc");

if (!result.ok) {
    console.log(result.error);
}
```

---

## Number Validation

```ts
number()
    .positive()
    .max(100)
    .check(25);
```

---

## Array Validation

```ts
array()
    .nonEmpty()
    .min(2)
    .check(["A", "B"]);
```

---

## Object Validation

```ts
object().check({
    username: "Prey"
});
```

---

## Regex Utilities

```ts
import { search } from "@preplabs/validator";

const regex = search()
    .ignoreCase()
    .startsWith("Pre");
```

---

## Roadmap

- [x] String Validator
- [x] Number Validator
- [x] Boolean Validator
- [x] Array Validator
- [x] Object Validator
- [x] Date Validator
- [x] Search Utilities
- [ ] Schema Validation
- [ ] Nested Objects
- [ ] Async Validation

---

## License

MIT © PreyLabs
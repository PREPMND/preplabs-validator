# @preplabs/validator

> A lightweight, TypeScript-first validation library. Zero dependencies. Simpler than Zod.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)]()
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)]()
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

---

## Installation

```bash
npm install @preplabs/validator
```

---

## Why @preplabs/validator?

- **Zero dependencies** — nothing to audit, nothing to break
- **Simpler API** — chain methods, call `.check()`, done
- **TypeScript-first** — full type safety out of the box
- **Lightweight** — just the validators you need
- **Safe mode** — `.safeCheck()` never throws, returns `{ ok, value, error }`
- **Schema validation** — validate entire objects with nested fields
- **Async support** — for database lookups, API checks, etc.

---

## Quick Start

```ts
import { string, number, schema } from "@preplabs/validator";

// Simple
string().email().check("user@example.com");
number().positive().integer().check(25);

// Schema
const userSchema = schema({
  name: string().min(2).max(50),
  age: number().positive().integer(),
  email: string().email(),
});

const result = userSchema.check({
  name: "Prey",
  age: 25,
  email: "prey@labs.com",
});
// { ok: true, value: { name: "Prey", age: 25, email: "prey@labs.com" } }
```

---

## String Validator

```ts
import { string } from "@preplabs/validator";
```

### Chainable Methods

| Method | Description |
|---|---|
| `.min(n)` | Minimum length |
| `.max(n)` | Maximum length |
| `.nonEmpty()` | Must not be empty |
| `.startsWith(str)` | Must start with prefix |
| `.endsWith(str)` | Must end with suffix |
| `.contains(str)` | Must contain substring |
| `.trim()` | Trims whitespace before validating |
| `.lowercase()` | Must be all lowercase |
| `.uppercase()` | Must be all uppercase |
| `.oneOf(["a","b"])` | Must be one of the values |
| `.regex(pattern, name?)` | Must match custom regex |

### Built-in Format Validators

| Method | Description |
|---|---|
| `.email()` | Valid email format |
| `.url()` | Valid HTTP/HTTPS URL |
| `.uuid()` | Valid UUID |
| `.phone()` | Valid phone number (10-15 digits) |
| `.ipv4()` | Valid IPv4 address |
| `.hexColor()` | Valid hex color (#fff or #ffffff) |
| `.slug()` | Valid URL slug (lowercase, hyphens, numbers) |
| `.alphanumeric()` | Letters and numbers only |
| `.numeric()` | Digits only |
| `.alpha()` | Letters only |
| `.json()` | Valid JSON string |
| `.base64()` | Valid base64 string |
| `.creditCard()` | Valid credit card number format |
| `.jwt()` | Valid JWT format |
| `.cuid()` | Valid CUID format |
| `.semver()` | Valid semantic version |

### Presets

| Method | Description |
|---|---|
| `.user(value)` | Username: 5-20 chars |
| `.psw(value)` | Password: 8-20 chars, trimmed |
| `.safeUser(value)` | Safe version of `.user()` |
| `.safePsw(value)` | Safe version of `.psw()` |

### Examples

```ts
// Email
string().email().check("user@example.com");

// URL
string().url().check("https://preplabs.dev");

// UUID
string().uuid().check("550e8400-e29b-41d4-a716-446655440000");

// Custom regex
string().regex(/^[A-Z]{3}-\d{4}$/, "product code").check("ABC-1234");

// Enum-like
string().oneOf(["admin", "user", "guest"]).check("admin");

// Trimmed + min
string().trim().nonEmpty().min(3).check("  hello  ");

// Safe mode (never throws)
const result = string().email().safeCheck("not-an-email");
// { ok: false, value: "not-an-email", error: "String must be a valid email." }
```

---

## Number Validator

```ts
import { number } from "@preplabs/validator";
```

### Chainable Methods

| Method | Description |
|---|---|
| `.min(n)` | Minimum value |
| `.max(n)` | Maximum value |
| `.integer()` | Must be an integer |
| `.positive()` | Must be > 0 |
| `.negative()` | Must be < 0 |
| `.finite()` | Must be finite (no Infinity) |
| `.safe()` | Must be a safe integer |
| `.multipleOf(n)` | Must be a multiple of n |
| `.oneOf([1,2,3])` | Must be one of the values |

### Presets

| Method | Description |
|---|---|
| `.age(value)` | Integer 0-150 |
| `.percentage(value)` | 0-100 |
| `.port(value)` | Integer 0-65535 |
| `.latitude(value)` | -90 to 90 |
| `.longitude(value)` | -180 to 180 |
| `.httpStatus(value)` | Integer 100-599 |

### Examples

```ts
number().positive().integer().check(25);
number().min(0).max(100).check(50);
number().multipleOf(5).check(15);
number().port(8080);
number().latitude(40.7128);

// Safe mode
const result = number().positive().safeCheck(-5);
// { ok: false, value: 0, error: "Expected a positive number." }
```

---

## Boolean Validator

```ts
import { boolean } from "@preplabs/validator";
```

| Method | Description |
|---|---|
| `.check(value)` | Must be a boolean |
| `.isTrue(value)` | Must be `true` |
| `.isFalse(value)` | Must be `false` |
| `.safeCheck(value)` | Safe mode |

```ts
boolean().check(true);
boolean().isTrue(true);
boolean().isFalse(false);
```

---

## Array Validator

```ts
import { array } from "@preplabs/validator";
```

### Chainable Methods

| Method | Description |
|---|---|
| `.min(n)` | Minimum length |
| `.max(n)` | Maximum length |
| `.nonEmpty()` | Must not be empty |
| `.unique()` | All elements must be unique |
| `.includes(item)` | Must contain the item |
| `.ofStrings()` | All elements must be strings |
| `.ofNumbers()` | All elements must be numbers |
| `.ofBooleans()` | All elements must be booleans |
| `.every(fn, name?)` | Custom check per element |

### Examples

```ts
array().nonEmpty().min(2).check(["a", "b", "c"]);
array().unique().check([1, 2, 3]);
array().ofStrings().check(["hello", "world"]);
array().ofNumbers().max(5).check([1, 2, 3]);
array().includes("admin").check(["admin", "user"]);

// Custom element check
array().every(
  (item) => typeof item === "string" && item.length > 0,
  "non-empty string"
).check(["hello", "world"]);
```

---

## Object Validator

```ts
import { object } from "@preplabs/validator";
```

### Chainable Methods

| Method | Description |
|---|---|
| `.strict()` | No extra properties allowed |
| `.nonEmpty()` | Must have at least one key |
| `.hasKeys(["a","b"])` | Must have these keys |
| `.minKeys(n)` | Minimum number of keys |
| `.maxKeys(n)` | Maximum number of keys |

### Examples

```ts
object().nonEmpty().check({ name: "Prey" });
object().hasKeys(["name", "age"]).check({ name: "Prey", age: 25 });
object().minKeys(2).maxKeys(5).check({ a: 1, b: 2 });
```

---

## Date Validator

```ts
import { date } from "@preplabs/validator";
```

### Chainable Methods

| Method | Description |
|---|---|
| `.before(date)` | Must be before the given date |
| `.after(date)` | Must be after the given date |
| `.future()` | Must be in the future |
| `.past()` | Must be in the past |

### Examples

```ts
date().past().check(new Date("2020-01-01"));
date().future().check(new Date("2030-01-01"));
date().after(new Date("2020-01-01")).before(new Date("2025-01-01")).check(new Date("2023-06-15"));
```

---

## Schema Validation

The most powerful feature. Define shapes, validate entire objects at once.

```ts
import { schema, string, number, boolean, optional } from "@preplabs/validator";
```

### Basic Schema

```ts
const userSchema = schema({
  name: string().min(2).max(50),
  email: string().email(),
  age: number().positive().integer(),
});

userSchema.check({
  name: "Prey",
  email: "prey@labs.com",
  age: 25,
});
```

### Schema with Optional Fields

```ts
const profileSchema = schema({
  name: string().min(2),
  bio: optional(string().max(500)),
  website: optional(string().url()),
});

profileSchema.check({
  name: "Prey",
  // bio and website are optional — undefined is fine
});
```

### Strict Mode

```ts
const strictSchema = schema({
  name: string().min(1),
  age: number().positive(),
}).strict();

strictSchema.check({ name: "Prey", age: 25 });
// Throws if extra keys are present
```

### Extend, Pick, Omit, Merge

```ts
const baseSchema = schema({
  name: string().min(2),
  email: string().email(),
  age: number().positive(),
});

// Extend with more fields
const extendedSchema = baseSchema.extend({
  role: string().oneOf(["admin", "user"]),
});

// Pick specific fields
const loginSchema = baseSchema.pick(["email"]);

// Omit fields
const publicSchema = baseSchema.omit(["email"]);

// Merge two schemas
const merged = baseSchema.merge(schema({
  role: string().oneOf(["admin", "user"]),
}));
```

### Schema Error Handling

```ts
const result = userSchema.check({
  name: "",
  email: "not-an-email",
  age: -5,
});

// {
//   ok: false,
//   value: {},
//   errors: {
//     name: "String length is less than the minimum length of 2.",
//     email: "String must be a valid email.",
//     age: "Expected a positive number."
//   }
// }
```

Use `.safeCheck()` to also catch root-level errors (e.g., passing a non-object):

```ts
const result = userSchema.safeCheck("not an object");
// { ok: false, value: {}, errors: { _root: "Expected an object." } }
```

---

## Enum Validator

```ts
import { enums } from "@preplabs/validator";

enums(["admin", "user", "guest"]).check("admin");
enums([1, 2, 3]).check(2);
```

---

## Literal Validator

```ts
import { literal } from "@preplabs/validator";

literal("active").check("active");
literal(42).check(42);
literal(true).check(true);
```

---

## Tuple Validator

Fixed-length arrays where each position has its own validator.

```ts
import { tuple, string, number } from "@preplabs/validator";

tuple([string().min(1), number().positive()]).check(["hello", 42]);
```

---

## Union Validator

Value must match at least one of the validators.

```ts
import { union, string, number } from "@preplabs/validator";

union([string(), number()]).check("hello"); // ok
union([string(), number()]).check(42);      // ok
```

---

## Optional & Nullable

```ts
import { optional, nullable, string } from "@preplabs/validator";

// Optional: undefined is ok
optional(string().email()).check(undefined);       // ok
optional(string().email()).check("prey@labs.com"); // ok

// Nullable: null is ok
nullable(string().email()).check(null);            // ok
nullable(string().email()).check("prey@labs.com"); // ok
```

---

## Refine (Custom Validation)

Add custom logic on top of any validator.

```ts
import { refine, string } from "@preplabs/validator";

const noSpaces = refine(
  string().min(3),
  (val) => !(val as string).includes(" "),
  "Must not contain spaces"
);

noSpaces.check("hello");   // ok
noSpaces.check("he llo");  // throws "Must not contain spaces"
```

---

## Any Validator

Passes everything. Useful in schemas for fields you just want to exist.

```ts
import { any } from "@preplabs/validator";

any().check("anything");
any().check(42);
any().check(null);
```

---

## Async Validation

For checks that need database lookups, API calls, etc.

```ts
import { async, string } from "@preplabs/validator";

const uniqueEmail = async(string().email())
  .addCheck(
    async (email) => {
      // Your database lookup
      const exists = await db.users.findByEmail(email);
      return !exists;
    },
    "Email already taken"
  );

const result = await uniqueEmail.check("prey@labs.com");
// or
const safe = await uniqueEmail.safeCheck("prey@labs.com");
```

---

## Search (Regex Builder)

```ts
import { search } from "@preplabs/validator";

const regex = search().contains("prey");
regex.test("I am Prey");  // true (case-insensitive by default)

search().caseSensitive().startsWith("Pre").test("Prey");  // true
search().exact("hello").test("hello");                     // true
search().endsWith(".com").test("preplabs.com");            // true
```

---

## Regex Constants

Pre-built regex patterns you can use directly.

```ts
import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  UUID_REGEX,
  PHONE_REGEX,
  IPV4_REGEX,
  HEX_COLOR_REGEX,
  SLUG_REGEX,
} from "@preplabs/validator";
```

---

## Safe Mode

Every validator has `.safeCheck()` — it never throws, always returns a result object.

```ts
const result = string().email().safeCheck("bad");

if (!result.ok) {
  console.log(result.error);
  // "String must be a valid email."
}
```

---

## Real-World Example

```ts
import { schema, string, number, boolean, optional, enums, array } from "@preplabs/validator";

const createUserSchema = schema({
  username: string().min(3).max(20).alphanumeric(),
  email: string().email(),
  password: string().min(8).max(128),
  age: optional(number().integer().min(13).max(150)),
  role: enums(["admin", "moderator", "user"]),
  tags: optional(array().ofStrings().max(10)),
  newsletter: optional(boolean()),
});

// In your route handler
function createUser(body: unknown) {
  const result = createUserSchema.check(body);

  if (!result.ok) {
    return { status: 400, errors: result.errors };
  }

  // result.value is your validated data
  return { status: 200, data: result.value };
}
```

---

## API Summary

| Function | Description |
|---|---|
| `string()` | String validator |
| `number()` | Number validator |
| `boolean()` | Boolean validator |
| `array()` | Array validator |
| `object()` | Object validator |
| `date()` | Date validator |
| `schema({})` | Schema validator for objects |
| `enums([])` | Enum validator |
| `literal(val)` | Exact value validator |
| `tuple([])` | Fixed-length array validator |
| `union([])` | One-of-many validator |
| `optional(v)` | Allows undefined |
| `nullable(v)` | Allows null |
| `refine(v, fn, msg)` | Custom validation logic |
| `any()` | Accepts any value |
| `async(v)` | Async validation wrapper |
| `search()` | Regex builder |

---

## Roadmap

- [x] String Validator (with 16+ format validators)
- [x] Number Validator (with presets)
- [x] Boolean Validator
- [x] Array Validator (with element checking)
- [x] Object Validator (with key checks)
- [x] Date Validator (with future/past)
- [x] Schema Validation (with extend/pick/omit/merge)
- [x] Enum, Literal, Tuple, Union
- [x] Optional & Nullable
- [x] Refine (custom validation)
- [x] Async Validation
- [x] Search Utilities
- [x] Regex Constants

---

## License

MIT © PreyLabs

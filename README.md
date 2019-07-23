<p align="center">
  <img src="sjs.svg" height="200px" alt="slow-json-stringify logo" />
  <br>
  <a href="https://travis-ci.org/lucagez/slow-json-stringify"><img src="https://travis-ci.com/lucagez/slow-json-stringify.svg?branch=master" alt="travis"></a>
  <a href="https://www.npmjs.org/package/slow-json-stringify"><img src="https://img.shields.io/npm/v/slow-json-stringify.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-f1c40f.svg" alt="MIT">
  <a href="https://unpkg.com/slow-json-stringify"><img src="https://img.badgesize.io/https://unpkg.com/slow-json-stringify/dist/sjs.js?compression=gzip" alt="gzip size"></a>
</p>

# SJS

The slowest stringifier in the known universe. Just kidding, it's the fastest (:

## TOC

  - [TL;DR](#tldr)
  - [Installation](#installation)
  - [How it works](#how-it-works)
  - [Caveats](#caveats)
  - [Benchmarks](#benchmarks)
      - [Running the benchmarks](#running-the-benchmarks)
      - [Test machine](#test-machine)
      - [Some numbers](#some-numbers)
  - [Usage](#usage)
      - [Supported types](#supported-types)
      - [Defining a schema](#defining-a-schema)
      - [Defining schema with simple array](#defining-schema-with-simple-array)
      - [Defining schema with complex array](#defining-schema-with-complex-array)
      - [Defining schema with nested objects](#defining-schema-with-nested-objects)
  - [API](#api)
      - [sjs](#sjs)
      - [escape](#escape)
  - [License](#license)



## TL;DR

`SJS` shows a significant increase in performance over both native `JSON.stringify` and `fast-json-stringify`.
For some use cases (dealing with long text), it performs **19000%** faster than both native and `fast-json-stringify`.

**NOTE:** Support for undefined properties has been added from **1.0.1**. `SJS` is now production ready.

Checkout [benchmarks](benchmark.md).

## Installation

`SJS` is fully compatible with both Node.js and the browser 🎉🎉

Node:
```bash
npm install slow-json-stringify
```

On the browser:
```html
<script src="https://unpkg.com/slow-json-stringify/dist/sjs.umd.js"></script>
```

## How it works

Why `SJS` is the fastest stringifier?
The traditional approach consists in serializing every property taken singularly.
`SJS` uses a different approach to serialization.

**Preparation:**
- A schema is provided
- The schema is stringified
- A templated string is built with the provided schema.

**Serialization:**
- Object values are inserted in the already built template.

It is faster simply because it performs a lot less work.

## Caveats

`SJS` does not have the flexibility of the native JSON.stringify.
But, if you are dealing with json with a fixed structure `SJS` will save you a ton of time.
Especially when the payload grows. And incredibly when serializing json with long text inside (think of a blog article or a product description...).

**note:** `SJS` won't perform any escaping as you usually won't need it in small payloads. If you are working with big text, it could be of very little effort to store in your db an already escaped text.

However, `SJS` provides a little utility for your escaping needs.
`escape` uses a default regex if no additional regex is provided.

**default regex string:** 
```javascript
/\n|\r|\t|\"|\\/gm
``` 

You can use `escape` like the following:

```javascript
const { escape } = require('slow-json-stringify');

// If you don't pass any additional regex, a default one will be used.
const escaper = escape();

escaper('This is "funny"'); // This is \"funny\"

// You can pass any regex you want for your escaping strategy.
const customEscaper = escape(/\"/gm);

customEscaper('This is "funny"'); // This is \"funny\"

```

## Benchmarks

We all know that there are three kinds of lies..

Lies, damned lies.. and benchmarks.

Remember to test if `SJS` could be a real improvement for your use case.
Because there are times when the performance advantages with the added drawbacks could not be worth it.

#### Running the benchmarks

Every benchmark is replicable on your own machine.
To run your tests:
- Clone this repo.
- Install dependencies.
- `cd benchmark`.
- Grant executable rights to `run.sh` script `chmod +x ./run.sh`.
- Save benchmark results to file `./run.sh >> benchmark.md`

#### Test machine

The benchmarks were performed on a Dell Xps 15 9550.
- **cpu:** intel i7 6700HQ
- **ram:** 16gb
- **os:** Ubuntu 18.04

#### Some numbers

Checkout benchmarks [here](benchmark.md)

## Usage

#### Supported types

The following types are supported:
- `string`, `Date` will be considered strings.
- `number`
- `boolean`, ➡ used for both `true/false` AND `null` ⬅
- `[array-simple]`, dynamic array with simple structure, in this scenario native `JSON.stringify` will be used. As there are no real performance advantages.
- `[schema]`, dynamic complex array. You should provide a `SJS` schema defining the structure of the objects that will make up your array.

**NOTE:** `SJS` is making a template from the provided schema and inserting values where necessary. So, if `undefined` values are provided, a string containing "undefined" will be returned.

**tip:** If you want to leave out certain properties from the stringified object, simply provide a schema without those properties. 

#### Defining a schema

For a correct stringification of your json payload, a correct schema is mandatory.
Defining a schema is pretty handy and not verbose at all.

```javascript
const { sjs } = require('slow-json-stringify');

// schema definition
const stringify = sjs({
  a: 'string',
  b: 'number',
  c: 'boolean',
});

// then you can stringify anything with that structure.
stringify({
  a: 'world',
  b: 42,
  c: true,
});

// {"a":"world","b":42,"c":true}

```

#### Defining schema with simple array

When stringifying simple array `JSON.stringify` will be internally used.

```javascript
const { sjs } = require('slow-json-stringify');

// schema definition
const stringify = sjs({
  a: ['array-simple']
});

// then you can stringify anything with that structure.
stringify({
  a: [1, 2, 3, true, 'world'],
});

// {"a":[1,2,3,true,"world"]}

```

#### Defining schema with complex array

This is one of the strong points of `SJS`. 
When stringifying complex array a new schema is required.

```javascript
const { sjs } = require('slow-json-stringify');

// schema definition
const stringify = sjs({
  a: [sjs({
    b: 'string',
    c: 'number',
  })]
});

// then you can stringify anything with that structure.
stringify({
  a: [{
    b: 'ciao1',
    d: 1,
  }, {
    b: 'ciao2',
    d: 2,
  }, {
    b: 'ciao3',
    d: 3,
  }, {
    b: 'ciao4',
    d: 4, 
  }],
});

// {"a":[{"b":"ciao1","d":1},{"b":"ciao2","d":2},{"b":"ciao3","d":3},{"b":"ciao4","d":4}]}

```

#### Defining schema with nested objects

Defining schemas with nested objects is pretty straightforward.

```javascript
const { sjs } = require('slow-json-stringify');

// schema definition
const stringify = sjs({
  a: {
    b: {
      c: 'string',
    },
  },
  d: {
    e: 'number',
  },
});

stringify({
  a: {
    b: {
      c: 'hello',
    },
  },
  d: {
    e: 42,
  },
});

// {"a":{"b":{"c":"hello"}},"d":{"e":42}}

```

## API

#### sjs
| param  | type    | required                           | default   | spec                                                |
|--------|---------|------------------------------------|-----------|-----------------------------------------------------|
| schema | object  | yes                                | undefined | Schema that defines the stringification behavior.   |

#### escape
| param | type               | required                           | default                   | spec                                                |
|-------|--------------------|------------------------------------|---------------------------|-----------------------------------------------------|
| regex | Regular Expression | no                                 | default regex | regex used to escape text                           |

## License

MIT.

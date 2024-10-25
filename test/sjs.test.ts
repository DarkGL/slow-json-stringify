import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sjs, escape, attr } from '../dist/sjs.js';

test('Should throw if unknown type is provided when defining a schema', () => {
    const schemaDefinition = () =>
        sjs({
            a: attr('sting' as 'string'), // Typo
        });
    const schemaDefinition1 = () =>
        sjs({
            a: attr('arry' as 'array'), // Typo
        });

    assert.throws(schemaDefinition);
    assert.throws(schemaDefinition1);
});

test('Should not throw if known type is provided when defining a schema', () => {
    const schemaDefinition = () =>
        sjs({
            a: attr('string'),
            b: attr('number'),
            c: attr('boolean'),
        });
    const schemaDefinition1 = () =>
        sjs({
            a: attr('array'),
            b: attr(
                'array',
                sjs({
                    a: attr('string'),
                }),
            ),
        });

    assert.doesNotThrow(schemaDefinition);
    assert.doesNotThrow(schemaDefinition1);
});

test('Should stringify a simple object equivalently to native JSON.stringify', () => {
    const stringify = sjs({
        hello: attr('string'),
    });

    const test = { hello: 'world' };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    assert.strictEqual(slow, native);
});

test('Should stringify an object with nested props equivalently to native JSON.stringify', () => {
    const stringify = sjs({
        hello: attr('string'),
        a: attr('number'),
        b: attr('boolean'),
        c: {
            d: {
                e: attr('string'),
            },
        },
    });

    const test = {
        hello: 'world',
        a: 123,
        b: false,
        c: {
            d: {
                e: 'pernacchia',
            },
        },
    };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    assert.strictEqual(slow, native);
});

test('Should stringify an object with simple arrays equivalently to native JSON.stringify', () => {
    const stringify = sjs({
        hello: attr('string'),
        a: attr('array'),
    });

    const test = {
        hello: 'world',
        a: [1, 2, 'test'],
    };
    const native = JSON.stringify(test);
    const slow = stringify(test);

    assert.strictEqual(slow, native);
});

test('Should stringify an object with complex arrays equivalently to native JSON.stringify', () => {
    const stringify = sjs({
        hello: attr('string'),
        a: attr(
            'array',
            sjs({
                b: attr('string'),
                c: {
                    d: attr('number'),
                },
            }),
        ),
    });

    const test = {
        hello: 'world',
        a: [
            {
                b: 'test',
                c: {
                    d: 189,
                },
            },
            {
                b: 'test1',
                c: {
                    d: 1892312,
                },
            },
            {
                b: 'test2',
                c: {
                    d: 9,
                },
            },
            {
                b: 'test3',
                c: {
                    d: 9.89,
                },
            },
            {
                b: 'test4',
                c: {
                    d: 1.323289,
                },
            },
        ],
    };

    const native = JSON.stringify(test);
    const slow = stringify(test);

    assert.strictEqual(slow, native);
});

test('Should stringify correct JSON syntax given a simple object', () => {
    const stringify = sjs({
        hello: attr('string'),
    });

    const test = { hello: 'world' };
    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should stringify correct JSON syntax given a complex object', () => {
    const stringify = sjs({
        hello: attr('string'),
        a: attr('number'),
        b: attr('boolean'),
        c: {
            d: {
                e: attr('string'),
            },
        },
    });

    const test = {
        hello: 'world',
        a: 123,
        b: false,
        c: {
            d: {
                e: 'pernacchia',
            },
        },
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should stringify correct JSON syntax given an object with dynamic arrays', () => {
    const stringify = sjs({
        hello: attr('string'),
        a: attr(
            'array',
            sjs({
                b: attr('string'),
                c: {
                    d: attr('number'),
                },
            }),
        ),
    });

    const test = {
        hello: 'world',
        a: [
            {
                b: 'test',
                c: {
                    d: 189,
                },
            },
            {
                b: 'test1',
                c: {
                    d: 1892312,
                },
            },
            {
                b: 'test2',
                c: {
                    d: 9,
                },
            },
            {
                b: 'test3',
                c: {
                    d: 9.89,
                },
            },
            {
                b: 'test4',
                c: {
                    d: 1.323289,
                },
            },
        ],
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should escape strings and parse correctly', () => {
    const stringify = sjs({
        hello: attr('string'),
    });

    const unescapedString = '"Hello World"';
    const escapedString = escape()(unescapedString);

    const test = {
        hello: escapedString,
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should escape strings when providing custom regex', () => {
    const stringify = sjs({
        hello: attr('string'),
    });

    const unescapedString = '"Hello World"';
    const escapedString = escape(/\"/gm)(unescapedString);

    const test = {
        hello: escapedString,
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should stringify undefined', () => {
    const stringify = sjs({
        hello: attr('string'),
        hello1: attr('number'),
        hello2: attr('boolean'),
    });

    const test = {
        hello: undefined,
        hello1: undefined,
        hello2: undefined,
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should stringify null', () => {
    const stringify = sjs({
        hello: attr('null'),
        hello1: attr('number'),
        hello2: attr('null'),
    });

    const test = {
        hello: null,
        hello1: undefined,
        hello2: null,
    };

    const slow = stringify(test);
    const native = JSON.stringify(test);

    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
    assert.strictEqual(slow, native);
});

test('Should stringify Dates', () => {
    const stringify = sjs({
        hello: attr('string'),
        hello1: attr('string'),
    });

    const test = {
        hello: new Date(),
        hello1: Date.now(),
    };

    const slow = stringify(test);
    const t = () => JSON.parse(slow);

    assert.doesNotThrow(t);
});

test('Should stringify correctly given same property names', () => {
    const stringify = sjs({
        a: attr('string'),
        b: {
            a: attr('string'),
        },
    });

    const test = {
        a: 'a',
        b: {
            a: 'a1',
        },
    };
    const slow = stringify(test);
    const t = JSON.parse(slow);

    assert.strictEqual(t.a, 'a');
    assert.strictEqual(t.b.a, 'a1');
});

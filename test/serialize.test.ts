import { test } from 'node:test';
import assert from 'node:assert/strict';
import sinon from 'sinon';
import { sjs, attr } from '../dist/sjs.js';
import type { Serializer } from '../src/types.js';

/**
 * The serialization feature adds support for custom validation or hides/shows
 * property based on a set of rules.
 */

// Test case 1: Spy to track function calls
test('invoke a function while serializing single property', () => {
    function serializer(raw: any) { undefined }

    const spySerializer = sinon.spy(serializer as Serializer);

    const stringify = sjs({
        a: attr('string', spySerializer),
    });

    stringify({ a: 'hello' });

    assert.equal(spySerializer.callCount, 1);
});

// Test case 2: Ensure correct argument is passed to serializer
test('invoke serializer providing raw property', () => {
    function serializer(raw: any) {
        assert.equal(raw, 'hello');
    }

    const spySerializer = sinon.spy(serializer as Serializer);

    const stringify = sjs({
        a: attr('string', spySerializer),
    });

    stringify({ a: 'hello' });

    assert.equal(spySerializer.callCount, 1);
});

// Test case 3: Ensure property serialization is skipped when serializer returns undefined
test('skip property serialization when serializer returns undefined', () => {
    const stringify = sjs({
        a: attr('string', (raw) => undefined),
        b: attr('number', (raw) => undefined),
    });

    const empty = stringify({ a: 'hello', b: 42 });

    assert.equal(empty, '{}');
});

// Test case 4: Ensure serializer's return value is used in serialization
test('serialize returned value from serializer', () => {
    const stringify = sjs({
        a: attr('string', (raw) => (raw === 'hello' ? 'world' : 'pino')),
    });

    assert.equal(stringify({ a: 'hello' }), '{"a":"world"}');
    assert.equal(stringify({ a: 'ginetto' }), '{"a":"pino"}');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sjs } from '../dist/sjs.js';
import { data } from './data.js';

/**
 * Testing undefined property support with complex structures.
 */

Object.keys(data).forEach((record) => {
    const { schema, obj } = data[record];
    const stringify = sjs(schema);

    test(`Serialize structure ${record} as native JSON.stringify`, () => {
        const native = JSON.stringify(obj);
        const slow = stringify(obj);

        assert.strictEqual(slow, native);
    });
});

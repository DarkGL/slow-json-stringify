import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sjs } from '../dist/sjs.js';
import { data } from './data.js';

/**
 * Testing undefined property support with complex structures.
 */

for (const record of Object.keys(data)) {
    const { schema, obj } = data[record];
    const stringify = sjs(schema);

    test(`Serialize structure ${record} as native JSON.stringify`, () => {
        const native = JSON.stringify(obj);
        const slow = stringify(obj);

        assert.strictEqual(slow, native);
    });
}

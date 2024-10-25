import { expect } from 'chai';
import { sjs } from '../dist/sjs.js';

/**
 * Testing undefined property support with complex structures.
 */

const data = require('../test/data.js');

Object.keys(data).forEach((record) => {
  const { schema, obj } = data[record];
  const stringify = sjs(schema);

  const native = JSON.stringify(obj);
  const slow = stringify(obj);

  expect(slow).to.be.equal(native);
});
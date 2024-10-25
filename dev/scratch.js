import { sjs, attr } from '../dist/sjs.js';

const stringify = sjs({
  a: attr('string', value => `${value} lol`),
  b: attr('null'),
  // c: {
  //   a: attr('array', sjs({
  //     l: 'string',
  //   })),
  // }
  c: attr('array'),
  d: attr('array', sjs({
    b: attr('array'),
    c: attr('array'),
  })),
  x: {
    y: {
      z: attr('string')
    }
  }
});

console.log(stringify({
  a: 'hello',
  b: null,
  c: {
    a: [{
      l: 'lol'
    }, {
      l: 'lolllp'
    }],
  },
  d: [{
    b: [{
      asd: 'asd'
    }],
    c: [{
      asd: 'asd'
    }]
  }],
  asd: 1,
}));

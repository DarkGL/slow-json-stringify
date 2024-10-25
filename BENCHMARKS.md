
> slow-json-stringify@1.0.1 benchmark /Users/luca.gesmundo/me/slow-json-stringify
> cd benchmark && sh run.sh


# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**


## small-object

```bash
native x 11,312,420 ops/sec ±0.28% (96 runs sampled)
fast-json-stringify x 117,277,708 ops/sec ±0.18% (99 runs sampled)
slow-json-stringify x 133,719,646 ops/sec ±0.43% (98 runs sampled)

# slow-json-stringify is +14.02% faster

```

## small-array

```bash
native x 814,347 ops/sec ±0.36% (99 runs sampled)
fast-json-stringify x 883,817 ops/sec ±0.36% (98 runs sampled)
slow-json-stringify x 2,893,281 ops/sec ±0.58% (98 runs sampled)

# slow-json-stringify is +227.36% faster

```

## nested-props-short-text

```bash
native x 2,643,817 ops/sec ±0.49% (98 runs sampled)
fast-json-stringify x 8,466,477 ops/sec ±1.08% (100 runs sampled)
slow-json-stringify x 30,219,272 ops/sec ±0.76% (97 runs sampled)

# slow-json-stringify is +256.93% faster

```

## much-props-short-text

```bash
native x 1,639,558 ops/sec ±0.35% (94 runs sampled)
fast-json-stringify x 2,211,595 ops/sec ±0.32% (96 runs sampled)
slow-json-stringify x 4,505,200 ops/sec ±0.41% (99 runs sampled)

# slow-json-stringify is +103.71% faster

```

## much-props-big-text

```bash
native x 39,296 ops/sec ±0.57% (97 runs sampled)
fast-json-stringify x 70,164 ops/sec ±0.23% (97 runs sampled)
slow-json-stringify x 4,788,395 ops/sec ±0.71% (96 runs sampled)

# slow-json-stringify is +6724.67% faster

```

## big-text

```bash
native x 502,469 ops/sec ±0.67% (93 runs sampled)
fast-json-stringify x 993,387 ops/sec ±0.16% (95 runs sampled)
slow-json-stringify x 154,066,557 ops/sec ±0.52% (94 runs sampled)

# slow-json-stringify is +15409.22% faster

```

## big-array-short-text 

```bash
native x 7,405 ops/sec ±0.38% (99 runs sampled)
slow-json-stringify x 21,833 ops/sec ±0.77% (95 runs sampled)

# slow-json-stringify is +194.88% faster

```

## big-array-long-text

```bash
native x 196 ops/sec ±0.87% (85 runs sampled)
slow-json-stringify x 23,197 ops/sec ±0.28% (98 runs sampled)

# slow-json-stringify is +11735.20% faster

```

## big-array-long-number

```bash
native x 2,602 ops/sec ±0.30% (99 runs sampled)
slow-json-stringify x 7,650 ops/sec ±0.70% (94 runs sampled)

# slow-json-stringify is +194.12% faster

```

## undefined properties 

```bash
native x 6,158,114 ops/sec ±0.41% (98 runs sampled)
fast-json-stringify x 17,850,450 ops/sec ±0.26% (98 runs sampled)
slow-json-stringify x 50,143,060 ops/sec ±0.27% (96 runs sampled)

# slow-json-stringify is +180.91% faster

```

#!/bin/bash

RUNTIME="node"

TITLE="
# Benchmarks

Benchmarks performed on:
- native **JSON.stringify**
- **fast-json-stringify**
- **slow-json-stringify**

"

echo "$TITLE"

printf "## small-object \n\n"
$RUNTIME small-object.js

printf "## small-array \n\n"
$RUNTIME small-array.js

printf "## nested-props-short-text \n\n"
$RUNTIME nested-props-short-text.js

printf "## much-props-short-text \n\n"
$RUNTIME much-props-short-text.js

printf "## much-props-big-text \n\n"
$RUNTIME much-props-big-text.js

printf "## big-text \n\n"
$RUNTIME big-text.js

printf "## big-array-short-text \n\n"
$RUNTIME big-array-short-text.js

printf "## big-array-long-text \n\n"
$RUNTIME big-array-long-text.js

printf "## big-array-long-number \n\n"
$RUNTIME big-array-long-number.js

printf "## undefined properties \n\n"
$RUNTIME undef.js

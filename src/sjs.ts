import { _makeChunks } from './_makeChunks.js';
import { _makeQueue } from './_makeQueue.js';
import { _prepare } from './_prepare.js';
import { _select } from './_select.js';
import { attr, escape } from './_utils.js';
import type { Serializer, SjsSchema, SjsSerializer } from './types.js';

// Doing a lot of preparation work before returning the final function responsible for
// the stringification.
const sjs = (schema: SjsSchema): SjsSerializer => {
    const { preparedString, preparedSchema } = _prepare(schema);

    // Providing preparedSchema for univocal correspondence between created queue and chunks.
    // Provided original schema to keep track of the original properties that gets destroied
    // during schema preparation => e.g. array stringification method.
    const queue = _makeQueue(preparedSchema, schema);
    const chunks = _makeChunks(preparedString, queue);

    const chunkLength = chunks.length - 1;
    const queueLength = queue.length;

    const selectChunk = _select(chunks);

    // Exposed function
    return (obj) => {
        let temp = '';

        for (let i = 0; i < queueLength; ++i) {
            const { serializer, find } = queue[i]!;

            temp += selectChunk(serializer(find(obj)), i);
        }

        const { flag, pure, prevUndef } = chunks[chunkLength]!;

        return temp + (flag ? prevUndef : pure);
    };
};

export { sjs, attr, escape };
export type { Serializer };

import { _find } from './_utils.js';
import type { JSONPrimitive, PreparedSchema, QueueItem, SjsSchema } from './types.js';

const sjsRegex = /__sjs/;

/**
 * @param {object} preparedSchema - schema already validated
 * with modified prop values to avoid clashes.
 * @param {object} originalSchema - User provided schema
 * => contains array stringification serializers that are lost during preparation.
 */
const _makeQueue = (preparedSchema: PreparedSchema, originalSchema: SjsSchema) => {
    const queue: QueueItem[] = [];

    // Defining a function inside an other function is slow.
    // However it's OK for this use case as the queue creation is not time critical.
    (function scoped(obj: PreparedSchema | JSONPrimitive | undefined, acc: string[] = []) {
        if (typeof obj === 'string' && sjsRegex.test(obj)) {
            const usedAcc = Array.from(acc);
            const find = _find(usedAcc);
            const { serializer } = find(originalSchema);

            queue.push({
                serializer,
                find,
                name: acc[acc.length - 1]!,
            });

            return;
        }

        if (typeof obj !== 'object' || obj === null) {
            return;
        }

        // Recursively going deeper.
        // NOTE: While going deeper, the current prop is pushed into the accumulator
        // to keep track of the position inside of the object.
        Object.keys(obj).map((prop) => scoped(obj[prop], [...acc, prop]));
    })(preparedSchema);

    return queue;
};

export { _makeQueue };

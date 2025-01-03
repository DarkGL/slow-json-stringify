import type { AttrExecutable, AttrType, Serializer, SjsSerializer } from './types.js';

/**
 * `_find` is a super fast deep property finder.
 * It dynamically build the function needed to reach the desired
 * property.
 *
 * e.g.
 * obj = {a: {b: {c: 1}}}
 * _find(['a','b','c']) => (obj) => obj?.['a']?.['b']?.['c']
 *
 * @param {array} path - path to reach object property.
 */
const _find = (path: string[]) => {
    const length = path.length;

    let str = 'obj';

    for (let i = 0; i < length; ++i) {
        str += `?.['${path[i]}']`;
    }

    return eval(`(obj=>${str})`);
};

/**
 * `_makeArraySerializer` is simply a wrapper of another `sjs` schema
 * used for the serialization of arrais.
 *
 * @param {array} array - Array to serialize.
 * @param {any} method - `sjs` serializer.
 */
const _makeArraySerializer = (serializer: Function | undefined): AttrExecutable => {
    if (serializer instanceof Function) {
        return (array: any) => {
            // Stringifying more complex array using the provided sjs schema
            let acc = '';
            const { length } = array;
            for (let i = 0; i < length - 1; i++) {
                acc += `${serializer(array[i])},`;
            }

            // Prevent slice for removing unnecessary comma.
            acc += serializer(array[length - 1]);
            return `[${acc}]`;
        };
    }

    return (array: any) => JSON.stringify(array);
};

const TYPES = ['number', 'string', 'boolean', 'array', 'null'] as const;

const attr: {
    (type: 'array', serializer?: SjsSerializer): AttrExecutable;
    (type: Exclude<AttrType, 'array'>, serializer?: Serializer): AttrExecutable;
} = (type: AttrType, serializer?: Serializer): AttrExecutable => {
    if (!TYPES.includes(type)) {
        throw new Error(
            `Expected one of: "number", "string", "boolean", "null". received "${type}" instead`,
        );
    }

    const usedSerializer = serializer || ((value) => value);

    return {
        isSJS: true,
        type,
        serializer: type === 'array' ? _makeArraySerializer(serializer) : usedSerializer,
    };
};

// Little utility for escaping convenience.
// => if no regex is provided, a default one will be used.
const defaultRegex = /\n|\r|\t|\"|\\/gm;
const escape =
    (regex: RegExp = defaultRegex) =>
    (str: string) =>
        str.replace(regex, (char) => `\\${char}`);

export { _find, escape, attr };

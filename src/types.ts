import type { _makeQueue } from './_makeQueue.js';

type JSONPrimitive = string | number | boolean | null;

type AttrType = 'string' | 'number' | 'boolean' | 'array' | 'null';

/**
 * SjsSchema
 *
 * Schema that describe the structure of your data.
 *
 * Usage: https://github.com/DarkGL/slow-json-stringify#usage
 */
type SjsSchema = { [prop: string]: AttrExecutable | SjsSchema };

/**
 * SjsSerializer
 *
 * Serialize any object enforcing the provided schema.
 */
type SjsSerializer = (obj: unknown) => string;

/**
 * SjsEscaper
 *
 * Escape any string against the previously provided regex.
 */
type SjsEscaper = (str: string) => string;

/**
 * AttrExecutable
 *
 * Object that should be used only inside sjs schemas.
 */
type AttrExecutable = object;

/**
 * Mapping between AttrType and JSONPrimitive??
 *
 * The resulting JSONPrimitive should be of the same
 * type of AttrType. As the created template has a spot
 * to host the requested type.
 */
type Serializer = (raw: any) => JSONPrimitive | undefined;

type Queue = ReturnType<typeof _makeQueue>;

type PreparedSchema = { [prop: string]: JSONPrimitive };

type QueueItem = {
    serializer: Function;
    find: Function;
    name: string;
};

type Chunk = {
    flag: boolean;
    pure: string;
    prevUndef: string;
    isUndef: string;
    bothUndef: string;
};

export type {
    AttrType,
    AttrExecutable,
    JSONPrimitive,
    SjsSchema,
    SjsSerializer,
    SjsEscaper,
    Serializer,
    Queue,
    PreparedSchema,
    QueueItem,
    Chunk,
};

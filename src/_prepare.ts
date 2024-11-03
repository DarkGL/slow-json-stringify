import type { PreparedSchema, SjsSchema } from './types.js';

/**
 * `_prepare` - aims to normalize the schema provided by the user.
 * It will convert the schema in both a parseable string and an object
 * useable for making the chunks needed for the serialization part.
 * @param {object} schema - user provided schema
 */
const _prepare = (schema: SjsSchema) => {
    const preparedString = JSON.stringify(schema, (_, value) => value.isSJS ? `${value.type}__sjs` : value);

    const preparedSchema = JSON.parse(preparedString) as PreparedSchema;

    return {
        preparedString,
        preparedSchema,
    };
};

export { _prepare };

import { z } from "zod";

const zsodm = <S extends z.SomeZodObject>(
  srcObj: { [k: string]: any },
  defObj: z.infer<S>,
  schema: S,
) => {
  const retObj: { [k: string]: any } = {};

  // iterate through schema keys and types
  Object.entries(schema.shape).forEach(([k, zType]) => {
    const srcVal = srcObj[k];

    // recursively run this function on object types
    if (zType instanceof z.ZodObject) {
      retObj[k] =
        srcVal === undefined ? defObj[k] : zsodm(srcVal, defObj[k], zType);
      return;
    }

    const { success } = zType.safeParse(srcVal);
    if (success) {
      retObj[k] = srcVal;
      return;
    }

    retObj[k] = defObj[k];
    return;
  });

  return retObj as z.infer<S>;
};

/**
 * Zod Safe Object Deep Merge
 *
 * *Safely* deep merges an object with a source object that has a zod schema. By safe meaning:
 * - Mismatching value types (determined using the source object's zod schema) will be replaced with the source value
 * - Object entries (key value paris) not fonud in the source object will be discarded
 */
const wrapped = <S extends z.SomeZodObject, D extends z.ZodDefault<S>>(
  srcObj: {
    [k: string]: any;
  },
  schema: D,
) => zsodm(srcObj, schema._def.defaultValue(), schema._def.innerType);

export default wrapped;

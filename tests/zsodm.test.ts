import { expect, test } from "vitest";
import zsodm from "../src/lib/zsodm";
import { z } from "zod";

const TestSchema = z
  .object({
    objField: z.object({
      strField: z.string(),
      undefinedField: z.undefined(),
    }),
    arrField: z.array(z.number()),
  })
  .default({
    objField: {
      strField: "strVal",
      undefinedField: undefined,
    },
    arrField: [1, 2, 3],
  });

type TestType = z.infer<typeof TestSchema>;

test("Same object shape, different values", () => {
  const testObj: TestType = {
    objField: {
      strField: "foo",
      undefinedField: undefined,
    },
    arrField: [4, 5],
  };

  const res = zsodm(testObj, TestSchema);

  TestSchema.parse(res);

  expect(res).toStrictEqual(testObj);
});

test("Different object shape, different strField value", () => {
  const testObj = {
    objField: {
      strField: "bar",
      undefinedField: false,
    },
    arrField: {},
  };

  const res = zsodm(testObj, TestSchema);

  TestSchema.parse(res);

  expect(res).toStrictEqual({
    objField: {
      strField: "bar",
      undefinedField: undefined,
    },
    arrField: [1, 2, 3],
  });
});

test("Different object shape, missing objField", () => {
  const testObj = {
    arrField: [1, 2, 3],
  };

  const res = zsodm(testObj, TestSchema);

  TestSchema.parse(res);

  expect(res).toStrictEqual({
    objField: {
      strField: "strVal",
      undefinedField: undefined,
    },
    arrField: [1, 2, 3],
  });
});

import { setCount as setCountDB, getCount as getCountDB } from "../db/db";
import { defaultEndpointsFactory, z } from "express-zod-api";

export const setCount = defaultEndpointsFactory.build({
  input: z.object({ count: z.number() }),
  output: z.object({ ok: z.boolean() }),
  method: "post",
  handler: async ({ input }) => {
    await setCountDB(input.count);
    return { ok: true };
  },
});

export const getCount = defaultEndpointsFactory.build({
  input: z.object({}),
  output: z.object({ count: z.number() }),
  method: "get",
  handler: async () => {
    return { count: await getCountDB() };
  },
});

export const increment = defaultEndpointsFactory.build({
  input: z.object({}),
  output: z.object({ count: z.number() }),
  method: "post",
  handler: async () => {
    const count = await getCountDB();
    setCountDB(count + 1);
    return { count: await getCountDB() };
  },
});

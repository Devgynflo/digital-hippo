import z from "zod";
import { QueryValidator } from "./query-validator";

export const getInfiniteProductValidators = z.object({
  limit: z.number().min(1).max(100),
  cursor: z.number().nullish(), // field not provided, explicitly `null`, or explicitly `undefined`
  query: QueryValidator,
});

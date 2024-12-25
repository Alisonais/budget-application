import { z } from "zod";

export const subTotalDataSchema = z.object({
  laborPrice: z.number(),
  partPrice: z.number(),
  totalValue: z.number()
});

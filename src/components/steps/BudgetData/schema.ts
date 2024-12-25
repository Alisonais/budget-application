import { z } from "zod";

export const budgetStepSchema = z.object({
  description: z.string(),
  LaborCost: z.array(
    z.object({
      carPart: z.string(),
      price: z.number().nullable()
    })
  ),
  PartCost: z.array(
    z.object({
      carPartChange: z.string(),
      priceChange: z.number().nullable()
    })
  )
});

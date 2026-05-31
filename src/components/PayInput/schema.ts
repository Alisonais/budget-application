import { z } from "zod";
import { type } from "../types/budgetTypes";

export const PaymentStepSchema = z.object({
  partpayment: z.string(),
  laborpayment: z.array(
    z.object({
      budgetId: z.string(),
      createdAt: z.string(),
      type: z.nativeEnum(type),
      value: z.number(),
    }),
  )
});

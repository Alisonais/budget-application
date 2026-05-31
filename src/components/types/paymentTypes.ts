import { z } from "zod";

const PaymentTypeSchema = z.enum(['Pix', 'Crédito', 'Dinheiro']);

const PaymentSchema = z.object({
  id: z.string(),
  budgetId: z.string(),
  createdAt: z.number().int().positive(),
  type: PaymentTypeSchema,
  value: z.number().positive(),
});

export const PaymentDataSchema = z.array(PaymentSchema);

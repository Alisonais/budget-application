import { z } from "zod";

export const PaymentStepSchema = z.object({
  onTimePay: z.string(),
  creditPay: z.string()
});

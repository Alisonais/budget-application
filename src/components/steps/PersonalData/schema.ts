import { z } from "zod";

export const personalStepSchema = z.object({
  name: z.string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres'),

  adress: z.string(),

  neighborhood: z.string(),

  city: z.string(),

  phone: z.string()
    .min(10, 'O número de telefone deve ter pelo menos 10 dígitos')
    .regex(/^(55)?\d{11}$/, 'Formato de número de telefone brasileiro inválido'),
});

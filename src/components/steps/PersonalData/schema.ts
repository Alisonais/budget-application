import { z } from "zod";

export const personalStepSchema = z.object({
  name: z.string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .regex(/^[a-zA-Z ]+$/, 'O nome deve conter apenas letras e espaços'),

  adress: z.string(),

  neighborhood: z.string(),

  city: z.string(),

  phone: z.string()
    .min(10, 'O número de telefone deve ter pelo menos 10 dígitos')
    .regex(/^\d{2}9\d{8}$/, 'Formato de número de telefone brasileiro inválido'),
});

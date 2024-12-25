import { z } from "zod";

export const carStepSchema = z.object({
  model: z.string().min(1, 'Imforme o modelo do veiculo'),

  brand: z.string(),

  plate: z.string(),

  year: z.number().min(1900, 'Informe o ano do veiculo').max(new Date().getFullYear() + 1, 'Informe o ano do veiculo'),

  color: z.string().min(1, 'Informe a cor do veiculo'),
});

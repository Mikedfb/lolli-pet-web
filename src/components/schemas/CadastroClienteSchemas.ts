import { z } from 'zod';

const PetSchema = z.object({
  nomePet: z.string().min(1, 'O nome do Pet é obrigatório.'),
  especie: z.string().min(1, 'A espécie do Pet é obrigatória.'),
  raca: z.string().optional().nullable().default(''),
});

export const cadastroClienteSchemas = z.object({
  nome: z.string().min(3, 'O nome completo é obrigatório.'),
  email: z
    .string()
    .email('Formato de e-mail inválido.')
    .min(1, 'O e-mail é obrigatório.'),
  telefone: z
    .string()
    .regex(
      /^\d{10,11}$/,
      'Telefone inválido (apenas números, 10 ou 11 dígitos).',
    )
    .min(10, 'O telefone é obrigatório.'),

  pets: z.array(PetSchema).min(1, 'É obrigatório cadastrar pelo menos um pet.'),
});

export type PetFormData = z.infer<typeof PetSchema>;
export type CadastroClienteFormData = z.infer<typeof cadastroClienteSchemas>;

import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'O nome é obrigatório.' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),
    email: z.string().email({ message: 'Insira um e-mail válido.' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
      .max(100, { message: 'A senha deve ter no máximo 100 caracteres.' }),
    confirmPassword: z
      .string()
      .min(6, {
        message: 'A confirmação da senha deve ter pelo menos 6 caracteres.',
      })
      .max(100, {
        message: 'A confirmação da senha deve ter no máximo 100 caracteres.',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .max(100, { message: 'A senha deve ter no máximo 100 caracteres.' }),
})

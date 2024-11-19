import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
})

'use server'

import { auth } from '@/lib/auth'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const signUpAction = createServerAction()
  .input(signUpSchema)
  .handler(async ({ input }) => {
    const { name, email, confirmPassword } = input

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password: confirmPassword,
      },
    })

    redirect('/sign-in')
  })

export const signInAction = createServerAction()
  .input(signInSchema)
  .handler(async ({ input }) => {
    const { email, password } = input

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })

    redirect('/')
  })

export const signOut = createServerAction().handler(async () => {
  await auth.api.signOut({
    headers: await headers(),
  })
  redirect('/sign-in')
})

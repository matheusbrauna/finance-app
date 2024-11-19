'use server'

import { auth } from '@/lib/auth'
import { signInSchema } from '@/lib/validations/auth'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

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

'use server'

import { auth } from '@/lib/auth'
import { signUpSchema } from '@/lib/validations/auth'
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

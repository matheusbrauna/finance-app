'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerActionProcedure } from 'zsa'

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      redirect('/sign-in')
    }
  }
)

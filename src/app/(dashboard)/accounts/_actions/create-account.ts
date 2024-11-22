'use server'

import { db } from '@/db/drizzle'
import { accounts, insertAccountSchema } from '@/db/schema'
import { authedProcedure } from '@/lib/authed-procedure'
import { revalidateTag } from 'next/cache'

export const createAccount = authedProcedure
  .createServerAction()
  .input(
    insertAccountSchema.pick({
      name: true,
    })
  )
  .handler(async ({ input, ctx }) => {
    const values = input
    const { userId } = ctx

    const [data] = await db
      .insert(accounts)
      .values({
        userId,
        ...values,
      })
      .returning()

    revalidateTag('accounts')

    return data
  })

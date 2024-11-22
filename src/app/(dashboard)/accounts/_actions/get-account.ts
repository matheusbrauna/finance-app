'use server'

import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { authedProcedure } from '@/lib/authed-procedure'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const getAccount = authedProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string().optional(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { id } = input
    const { userId } = ctx

    if (!id) {
      throw new Error('Missing id.')
    }

    const [data] = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.id, id)))

    if (!data) {
      throw new Error('Not found.')
    }

    return data
  })

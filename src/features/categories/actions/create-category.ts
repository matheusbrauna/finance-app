'use server'

import { db } from '@/db/drizzle'
import { categories, insertCategorySchema } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { createId } from '@paralleldrive/cuid2'
import { createServerActionProcedure } from 'zsa'

const authedProcedure = createServerActionProcedure().handler(async () => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized.')
  }

  return {
    userId,
  }
})

export const createCategoryAction = authedProcedure
  .createServerAction()
  .input(
    insertCategorySchema.pick({
      name: true,
    }),
  )
  .handler(async ({ input, ctx }) => {
    const { userId } = ctx

    const [data] = await db
      .insert(categories)
      .values({
        id: createId(),
        userId,
        ...input,
      })
      .returning()

    return {
      data,
    }
  })

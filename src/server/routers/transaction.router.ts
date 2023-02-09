import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { authedProcedure, router } from '../trpc'

export const transactionRouter = router({
  list: authedProcedure.query(async ({ ctx }) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: ctx.user.id,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return { transactions }
  }),
  create: authedProcedure
    .input(
      z.object({
        amount: z.number(),
        title: z.string(),
        type: z.enum(['income', 'outcome']),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await prisma.transaction.create({
        data: {
          amount: input.amount,
          title: input.title,
          type: input.type,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      })
    }),
})

import { TRPCError } from '@trpc/server'
import { getSession } from 'next-auth/react'
import { z } from 'zod'
import { procedure, router } from '../trpc'

export const transactionRouter = router({
  list: procedure.query(async ({ ctx }) => {
    const session = await getSession()
    const user = await ctx.prisma.session.findFirst({
      where: {
        userId: session?.user?.id!,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User not found!',
      })
    }

    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        user_id: user.userId,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return { transactions }
  }),
  create: procedure
    .input(
      z.object({
        amount: z.number(),
        title: z.string(),
        type: z.enum(['income', 'outcome']),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getSession()
      const user = await ctx.prisma.session.findFirst({
        where: {
          userId: session?.user?.id!,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User not found!',
        })
      }

      await ctx.prisma.transaction.create({
        data: {
          amount: input.amount,
          title: input.title,
          type: input.type,
          user_id: user.userId,
        },
      })
    }),
})

import { z } from 'zod'
import { createTRPCRouter, privateProcedure } from '../trpc'

export const transactionsRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) =>
    ctx.prisma.transaction.findMany({
      where: {
        user_id: ctx.userId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    }),
  ),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        amount: z.number().min(1),
        type: z.enum(['income', 'outcome']),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.transaction.create({
        data: {
          title: input.title,
          type: input.type,
          amount: input.amount,
          user_id: ctx.userId,
        },
      }),
    ),
})

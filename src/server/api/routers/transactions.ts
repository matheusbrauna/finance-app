import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const transactionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) =>
    ctx.prisma.transaction.findMany({
      where: {
        user_id: ctx.auth.userId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    }),
  ),
  create: protectedProcedure
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
          user_id: ctx.auth.userId,
        },
      }),
    ),
})

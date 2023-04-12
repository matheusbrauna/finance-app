import { z } from 'zod'
import { createTRPCRouter, privateProcedure } from '../trpc'

export const categoriesRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) =>
    ctx.prisma.category.findMany({
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
  update: privateProcedure
    .input(
      z.object({
        categoryId: z.string(),
        fields: z.object({
          title: z.string().optional(),
          percentage: z.number().min(1).optional(),
          amount: z.number().min(1).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.category.update({
        data: {
          title: input.fields.title,
          percentage: input.fields.percentage,
          amount: input.fields.amount,
        },
        where: {
          id: input.categoryId,
        },
      }),
    ),
  remove: privateProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.category.delete({
        where: {
          id: input.categoryId,
        },
      }),
    ),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        percentage: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.category.create({
        data: {
          title: input.title,
          percentage: input.percentage,
          user_id: ctx.userId,
        },
      }),
    ),
})

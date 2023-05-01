import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) =>
    ctx.prisma.category.findMany({
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
  update: protectedProcedure
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
  remove: protectedProcedure
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
  create: protectedProcedure
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
          user_id: ctx.auth.userId,
        },
      }),
    ),
})

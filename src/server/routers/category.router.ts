import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../../utils/prisma'
import { authedProcedure, router } from '../trpc'

export const categoryRouter = router({
  list: authedProcedure.query(async ({ ctx }) => {
    const categories = await prisma.category.findMany({
      where: {
        user_id: ctx.user.id,
      },
      orderBy: {
        title: 'asc',
      },
    })

    return { categories }
  }),
  create: authedProcedure
    .input(
      z.object({
        percentage: z.number(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const categoryAlreadyExists = await prisma.category.findFirst({
        where: {
          user_id: ctx.user.id,
          AND: {
            title: input.title,
          },
        },
      })

      if (categoryAlreadyExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Category already exists!',
        })
      }

      await prisma.category.create({
        data: {
          percentage: input.percentage,
          title: input.title,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      })
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.string(),
        updateFields: z.object({
          amount: z.number().optional(),
          title: z.string().optional(),
          percentage: z.number().optional(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const { amount, title, percentage } = input.updateFields

      await prisma.category.updateMany({
        where: {
          id: input.id,
        },
        data: {
          amount,
          title,
          percentage,
        },
      })
    }),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.category.delete({
        where: {
          id: input.id,
        },
      })
    }),
})

import { TRPCError } from '@trpc/server'
import { getSession } from 'next-auth/react'
import { z } from 'zod'
import { procedure, router } from '../trpc'

export const categoryRouter = router({
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

    const categories = await ctx.prisma.category.findMany({
      where: {
        user_id: user.userId,
      },
      orderBy: {
        title: 'asc',
      },
    })

    return { categories }
  }),
  create: procedure
    .input(
      z.object({
        percentage: z.number(),
        title: z.string(),
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

      const categoryAlreadyExists = await ctx.prisma.category.findFirst({
        where: {
          user_id: user.userId,
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

      await ctx.prisma.category.create({
        data: {
          percentage: input.percentage,
          title: input.title,
          user_id: user.userId,
        },
      })
    }),

  update: procedure
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

      const { amount, title, percentage } = input.updateFields

      await ctx.prisma.category.updateMany({
        where: {
          id: input.id,
          AND: {
            user_id: user.userId,
          },
        },
        data: {
          amount,
          title,
          percentage,
        },
      })
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.category.delete({
        where: {
          id: input.id,
        },
      })
    }),
})

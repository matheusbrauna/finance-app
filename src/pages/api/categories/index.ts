import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../services/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { amount, title, percentage } = req.body
    const session = await getSession({ req })
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? '',
      },
    })

    if (!user) {
      return res.status(400).json({
        message: 'User not found!',
      })
    }

    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        title,
        AND: {
          user,
        },
      },
    })

    if (categoryAlreadyExists) {
      return res.status(400).json({
        message: 'Category already exists!',
      })
    }

    await prisma.category.create({
      data: {
        amount,
        title,
        percentage,
        user: {
          connect: {
            email: user.email ?? '',
          },
        },
      },
    })

    return res.status(201).end()
  } else if (req.method === 'GET') {
    const session = await getSession({ req })
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? '',
      },
    })

    if (!user) {
      return res.status(400).json({
        message: 'User not found!',
      })
    }

    const categories = await prisma.category.findMany({
      where: {
        user,
      },
    })

    return res.status(200).json(categories)
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

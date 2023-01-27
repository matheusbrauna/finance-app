import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../services/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
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
    const id = String(req.query.id)
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return res.status(200).json(category)
  } else if (req.method === 'PUT') {
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

    const id = String(req.query.id)
    const { amount, percentage, title } = req.body
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        amount,
        percentage,
        title,
        user: {
          connect: {
            email: user.email ?? '',
          },
        },
      },
    })

    return res.status(201).json(category)
  } else if (req.method === 'DELETE') {
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

    const id = String(req.query.id)
    await prisma.category.delete({
      where: {
        id,
      },
    })

    return res.status(200).end()
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

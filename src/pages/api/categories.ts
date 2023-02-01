import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession()
  const user = await prisma.session.findFirst({
    where: {
      userId: session?.user.id,
    },
  })

  if (!user) {
    return res.redirect(400, '/login')
  }

  const { percentage, title } = req.body

  if (req.method === 'GET') {
    const categories = await prisma.category.findMany({
      where: {
        user_id: user.userId,
      },
      orderBy: {
        title: 'asc',
      },
    })

    return res.status(200).json(categories)
  } else if (req.method === 'POST') {
    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        user_id: user.userId,
        AND: {
          title,
        },
      },
    })

    if (categoryAlreadyExists) {
      return res.status(400).json({
        message: 'Category Already exists',
      })
    }

    await prisma.category.create({
      data: {
        percentage,
        title,
        user_id: user.userId,
      },
    })

    return res.status(201).end()
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

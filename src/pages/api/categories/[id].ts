import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession()
  const user = await prisma.session.findFirst({
    where: {
      userId: session?.user?.id!,
    },
  })

  if (!user) {
    return res.redirect(400, '/login')
  }

  if (req.method === 'DELETE') {
    const categoryId = String(req.query.id)
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    return res.status(200).end()
  } else if (req.method === 'PUT') {
    const categoryId = String(req.query.id)
    const { amount, title, percentage } = req.body

    await prisma.category.updateMany({
      where: {
        id: categoryId,
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

    return res.status(201).end()
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

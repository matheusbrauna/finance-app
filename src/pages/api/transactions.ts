/* eslint-disable no-case-declarations */
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
      userId: session?.user?.id!,
    },
  })

  if (!user) {
    return res.redirect(400, '/login')
  }

  const { amount, title, type } = req.body

  if (req.method === 'GET') {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: user.userId,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return res.status(200).json(transactions)
  } else if (req.method === 'POST') {
    await prisma.transaction.create({
      data: {
        amount,
        title,
        type,
        user: {
          connect: {
            id: user.userId,
          },
        },
      },
    })

    return res.status(201).end()
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

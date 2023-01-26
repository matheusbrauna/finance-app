import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { amount, title, type } = req.body

    const transactionAlreadyExists = await prisma.transaction.findFirst({
      where: {
        title,
      },
    })

    if (transactionAlreadyExists) {
      return res.status(400).json({
        message: 'transaction already exists!',
      })
    }

    await prisma.transaction.create({
      data: {
        amount,
        title,
        type,
      },
    })

    return res.status(201).end()
  } else if (req.method === 'GET') {
    const categories = await prisma.transaction.findMany()

    return res.status(200).json(categories)
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

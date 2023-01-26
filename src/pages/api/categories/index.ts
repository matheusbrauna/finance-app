import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { amount, title, percentage } = req.body

    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        title,
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
      },
    })

    return res.status(201).end()
  } else if (req.method === 'GET') {
    const categories = await prisma.category.findMany()

    return res.status(200).json(categories)
  }

  return res.status(405).json({
    message: 'Method not allowed',
  })
}

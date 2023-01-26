import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../services/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const id = String(req.query.id)
    const category = await prisma.category.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return res.status(200).json(category)
  } else if (req.method === 'PUT') {
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
      },
    })

    return res.status(201).json(category)
  } else if (req.method === 'DELETE') {
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

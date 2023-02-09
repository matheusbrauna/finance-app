import { Category } from '@prisma/client'
import { trpc } from '../utils/trpc'

export function useGetCategories() {
  const { data } = trpc.category.list.useQuery()

  const categories: Category[] | undefined = data?.categories.map(
    (category) => ({
      id: category.id,
      title: category.title,
      amount: category.amount,
      createdAt: new Date(category.createdAt),
      percentage: category.percentage,
      user_id: category.user_id,
    }),
  )

  return categories
}

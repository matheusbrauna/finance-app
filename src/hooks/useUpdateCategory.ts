import { Prisma } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'

async function updateCategory({
  id,
  amount,
  percentage,
  title,
}: Prisma.CategoryUpdateInput) {
  await api.put(`/categories/${id}`, {
    title,
    amount,
    percentage,
  })
}

export function useUpdateCategory() {
  const { mutate, mutateAsync } = useMutation(
    ['UpdateCategory'],
    (updateInput: Prisma.CategoryUpdateInput) => updateCategory(updateInput),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetCategories'])
      },
    },
  )

  return { mutate, mutateAsync }
}

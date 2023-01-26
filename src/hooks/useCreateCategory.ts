import { Prisma } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'

async function createCategory({
  amount,
  percentage,
  title,
}: Prisma.CategoryCreateInput) {
  await api.post('/categories', {
    amount,
    percentage,
    title,
  })
}

export function useCreateCategory() {
  const { mutate, mutateAsync } = useMutation(
    ['CreateCategory'],
    (createInput: Prisma.CategoryCreateInput) => createCategory(createInput),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetCategories'])
      },
    },
  )

  return {
    mutate,
    mutateAsync,
  }
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { z } from 'zod'

const createCategoryBodyInput = z.object({
  percentage: z.number(),
  title: z.string(),
})

type CreateCategoryInput = z.input<typeof createCategoryBodyInput>

export async function createCategory({
  percentage,
  title,
}: CreateCategoryInput) {
  await api.post('/categories', {
    percentage,
    title,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync } = useMutation(
    ['CreateCategory'],
    (createCategoryInput: CreateCategoryInput) =>
      createCategory(createCategoryInput),
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

import { useMutation } from '@tanstack/react-query'
import { api } from '../lib/api'
import { queryClient } from '../lib/queryClient'
import { z } from 'zod'

const createCategoryBodyInput = z.object({
  percentage: z.number(),
  title: z.string(),
})

type CreateCategoryInput = z.input<typeof createCategoryBodyInput>

async function createCategory({ percentage, title }: CreateCategoryInput) {
  await api.post('/categories', {
    percentage,
    title,
  })
}

export function useCreateCategory() {
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

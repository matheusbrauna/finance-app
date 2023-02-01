import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { z } from 'zod'

const updateCategoryBodyInput = z.object({
  id: z.string(),
  amount: z.number().optional(),
  title: z.string().optional(),
  percentage: z.number().optional(),
})

type UpdateCategoryInput = z.input<typeof updateCategoryBodyInput>

export async function updateCategory({
  id,
  amount,
  percentage,
  title,
}: UpdateCategoryInput) {
  await api.put(`/categories/${id}`, {
    amount,
    percentage,
    title,
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync } = useMutation(
    ['UpdateCategory'],
    (updateCategoryInput: UpdateCategoryInput) =>
      updateCategory(updateCategoryInput),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetCategories'])
      },
    },
  )

  return { mutate, mutateAsync }
}

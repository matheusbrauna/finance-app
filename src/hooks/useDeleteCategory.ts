import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'

export async function deleteCategory(id: string) {
  await api.delete(`/categories/${id}`)
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync, isLoading } = useMutation(
    ['DeleteCategory'],
    (id: string) => deleteCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetCategories'])
      },
    },
  )

  return {
    mutate,
    mutateAsync,
    isLoading,
  }
}

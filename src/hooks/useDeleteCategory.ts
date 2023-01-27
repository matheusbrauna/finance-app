import { useMutation } from '@tanstack/react-query'
import { api } from '../lib/api'
import { queryClient } from '../lib/queryClient'

async function deleteCategory(id: string) {
  await api.delete(`/categories/${id}`)
}

export function useDeleteCategory() {
  const { mutate, mutateAsync } = useMutation(
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
  }
}

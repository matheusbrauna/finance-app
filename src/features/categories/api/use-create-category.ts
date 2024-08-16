import { useServerActionMutation } from '@/lib/server-actions-hooks'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCategoryAction } from '@/features/categories/actions/create-category'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useServerActionMutation(createCategoryAction, {
    onSuccess: () => {
      toast.success('Categoria criada!')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: () => {
      toast.error('Failed to create category')
    },
  })
}

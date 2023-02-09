import { trpc } from '../utils/trpc'

export function useDeleteCategory() {
  const utils = trpc.useContext()
  const { mutate, mutateAsync, isLoading } = trpc.category.delete.useMutation({
    onSuccess: () => utils.category.list.invalidate(),
  })

  return {
    mutate,
    mutateAsync,
    isLoading,
  }
}

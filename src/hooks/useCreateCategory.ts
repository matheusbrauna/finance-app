import { trpc } from '../utils/trpc'

export function useCreateCategory() {
  const utils = trpc.useContext()
  const { mutate, mutateAsync } = trpc.category.create.useMutation({
    onSuccess: () => utils.category.list.invalidate(),
  })

  return {
    mutate,
    mutateAsync,
  }
}

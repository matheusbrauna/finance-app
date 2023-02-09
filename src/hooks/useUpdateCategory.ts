import { trpc } from '../utils/trpc'

export function useUpdateCategory() {
  const utils = trpc.useContext()
  const { mutate, mutateAsync } = trpc.category.update.useMutation({
    onSuccess: () => utils.category.list.invalidate(),
  })

  return { mutate, mutateAsync }
}

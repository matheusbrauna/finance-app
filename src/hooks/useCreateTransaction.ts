import { trpc } from '../utils/trpc'

export function useCreateTransaction() {
  const utils = trpc.useContext()
  const { mutate, mutateAsync } = trpc.transaction.create.useMutation({
    onSuccess: () => utils.transaction.list.invalidate(),
  })

  return {
    mutate,
    mutateAsync,
  }
}

import { Prisma } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'

async function createTransaction({
  amount,
  type,
  title,
}: Prisma.TransactionCreateInput) {
  await api.post('/transactions', {
    amount,
    type,
    title,
  })
}

export function useCreateTransaction() {
  const { mutate, mutateAsync } = useMutation(
    ['CreateTransaction'],
    (createInput: Prisma.TransactionCreateInput) =>
      createTransaction(createInput),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetTransactions'])
      },
    },
  )

  return {
    mutate,
    mutateAsync,
  }
}

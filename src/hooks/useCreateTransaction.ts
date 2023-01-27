import { useMutation } from '@tanstack/react-query'
import { api } from '../lib/api'
import { queryClient } from '../lib/queryClient'
import { z } from 'zod'

const createTransactionBodyInput = z.object({
  title: z.string(),
  type: z.enum(['income', 'outcome']),
  amount: z.number(),
})

type createTransactionInput = z.input<typeof createTransactionBodyInput>

async function createTransaction({
  amount,
  type,
  title,
}: createTransactionInput) {
  await api.post('/transactions', {
    amount,
    type,
    title,
  })
}

export function useCreateTransaction() {
  const { mutate, mutateAsync } = useMutation(
    ['CreateTransaction'],
    (createTransactionInput: createTransactionInput) =>
      createTransaction(createTransactionInput),
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

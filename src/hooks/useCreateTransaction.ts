import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { z } from 'zod'

const createTransactionBodyInput = z.object({
  title: z.string(),
  type: z.enum(['income', 'outcome']),
  amount: z.number(),
})

type CreateTransactionInput = z.input<typeof createTransactionBodyInput>

export async function createTransaction({
  amount,
  type,
  title,
}: CreateTransactionInput) {
  await api.post('/transactions', {
    amount,
    type,
    title,
  })
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()
  const { mutate, mutateAsync } = useMutation(
    ['CreateTransaction'],
    (createTransactionInput: CreateTransactionInput) =>
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

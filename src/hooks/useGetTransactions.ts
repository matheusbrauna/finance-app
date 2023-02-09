import { Transaction } from '@prisma/client'
import { trpc } from '../utils/trpc'

export function useGetTransactions() {
  const { data } = trpc.transaction.list.useQuery()

  const transactions: Transaction[] | undefined = data?.transactions.map(
    (transaction) => ({
      id: transaction.id,
      title: transaction.title,
      date: new Date(transaction.date),
      amount: transaction.amount,
      type: transaction.type,
      user_id: transaction.user_id,
    }),
  )

  return transactions
}

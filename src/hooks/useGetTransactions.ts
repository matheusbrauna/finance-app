import { Transaction } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

async function getTransactions() {
  const { data } = await api.get<Transaction[]>('/transactions')

  return data
}

export function useGetTransactions() {
  const { data } = useQuery(['GetTransactions'], getTransactions)

  return data
}

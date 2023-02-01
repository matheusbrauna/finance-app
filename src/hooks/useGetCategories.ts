import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'

export async function getCategories() {
  const { data } = await api.get<Category[]>('/categories')

  return data
}

export function useGetCategories() {
  const { data } = useQuery({
    queryKey: ['GetCategories'],
    queryFn: getCategories,
  })

  return data
}

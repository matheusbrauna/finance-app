import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

async function getCategories() {
  const { data } = await api.get<Category[]>('/categories')

  return data
}

export function useGetCategories() {
  const { data } = useQuery(['GetCategories'], getCategories)

  return data
}

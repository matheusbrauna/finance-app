import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await client.api.categories.$get()
      if (!res.ok) {
        throw new Error('Falha ao buscar categorias.')
      }
      const { data } = await res.json()
      return data
    },
  })
}

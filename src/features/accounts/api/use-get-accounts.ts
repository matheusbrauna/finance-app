import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const res = await client.api.accounts.$get()
      if (!res.ok) {
        throw new Error('Falha ao buscar contas.')
      }
      const { data } = await res.json()
      return data
    },
  })
}

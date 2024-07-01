import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccount = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['account', { id }],
    queryFn: async () => {
      const res = await client.api.accounts[':id'].$get({
        param: { id },
      })
      if (!res.ok) {
        throw new Error('Falha ao buscar conta.')
      }
      const { data } = await res.json()
      return data
    },
  })
}

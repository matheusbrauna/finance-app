import { client } from '@/lib/hono'
import { convertAmountFromMiliunits } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

export const useGetTransaction = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['transaction', { id }],
    queryFn: async () => {
      const res = await client.api.transactions[':id'].$get({
        param: { id },
      })
      if (!res.ok) {
        throw new Error('Failed to fetch transaction')
      }
      const { data } = await res.json()
      return data
    },
    select: (data) => {
      return {
        ...data,
        amount: convertAmountFromMiliunits(data.amount),
      }
    },
  })
}

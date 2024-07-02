import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.categories)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.categories)['bulk-delete']['$post']
>['json']

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.categories['bulk-delete'].$post({ json })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Categorias excluídas!')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Falha ao excluir categorias.')
    },
  })
}

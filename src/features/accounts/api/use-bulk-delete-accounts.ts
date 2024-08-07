import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json']

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts['bulk-delete'].$post({ json })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Contas excluídas!')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Falha ao excluir contas.')
    },
  })
}

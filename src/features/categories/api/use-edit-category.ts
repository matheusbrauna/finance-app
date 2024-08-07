import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$patch']
>
type RequestType = InferRequestType<
  (typeof client.api.categories)[':id']['$patch']
>['json']

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.categories[':id'].$patch({
        json,
        param: { id },
      })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Categoria atualizada!')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Falha ao atualizar categoria.')
    },
  })
}

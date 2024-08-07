import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient()
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.categories[':id'].$delete({
        param: { id },
      })
      return await res.json()
    },
    onSuccess: () => {
      toast.success('Categoria excluída!')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: () => {
      toast.error('Falha ao excluir categoria.')
    },
  })
}

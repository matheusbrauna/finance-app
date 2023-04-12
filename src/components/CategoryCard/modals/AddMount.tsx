/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '~/components/UI/Modal'
import { api } from '~/utils/api'

const addAmountFormSchema = z.object({
  amount: z.number(),
  title: z.string(),
})

type AddAmountFormData = z.infer<typeof addAmountFormSchema>

export function AddAmount() {
  const {
    addAmount: { category, isVisible },
    toggleAddAmount,
  } = useUiSlice()
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    register,
  } = useForm<AddAmountFormData>({
    resolver: zodResolver(addAmountFormSchema),
  })
  const { mutateAsync: updateMutate } = api.categories.update.useMutation()
  const { mutateAsync: createMutate } = api.transactions.create.useMutation()

  async function handleAddAmount({ amount, title }: AddAmountFormData) {
    if (!category) return
    await updateMutate({
      categoryId: category.id,
      fields: {
        amount: (category.amount ?? 0) + amount,
      },
    })
    await createMutate({
      amount,
      title,
      type: 'income',
    })
    reset()
    toggleAddAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddAmount(null)}
      title="Adicionar"
    >
      <Box as="form" onSubmit={handleSubmit(handleAddAmount)}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input size="lg" {...register('title')} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="md">Valor</FormLabel>
            <Input
              type="number"
              size="lg"
              {...register('amount', { valueAsNumber: true })}
            />
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            size="lg"
            colorScheme="green"
            isLoading={isSubmitting}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

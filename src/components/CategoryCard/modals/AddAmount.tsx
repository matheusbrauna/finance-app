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
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

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
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    register,
  } = useForm<AddAmountFormData>({
    resolver: zodResolver(addAmountFormSchema),
  })

  async function handleAddAmount({ amount, title }: AddAmountFormData) {
    await updateMutateAsync({
      id: category?.id!,
      amount: category?.amount! + amount,
    })
    await createMutateAsync({
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

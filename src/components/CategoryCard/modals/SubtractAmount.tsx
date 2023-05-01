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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUiSlice } from '../../../stores/ui-slice'
import { api } from '../../../utils/api'
import { Modal } from '../../UI/Modal'

const subtractAmountFormSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Valor precisar ser maior que 0' }),
  title: z
    .string({
      invalid_type_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' }),
})

type SubtractAmountFormData = z.infer<typeof subtractAmountFormSchema>

export function SubtractAmount() {
  const ctx = api.useContext()
  const {
    subtractAmount: { category, isVisible },
    toggleSubtractAmount,
  } = useUiSlice()
  const { mutateAsync: updateMutateAsync } = api.categories.update.useMutation()
  const { mutateAsync: createMutateAsync } =
    api.transactions.create.useMutation()
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    register,
  } = useForm<SubtractAmountFormData>({
    resolver: zodResolver(subtractAmountFormSchema),
  })

  async function handleSubtractAmount({
    amount,
    title,
  }: SubtractAmountFormData) {
    if (!category) return
    await updateMutateAsync(
      {
        categoryId: category?.id,
        fields: {
          amount: category.amount! - amount,
        },
      },
      {
        onSuccess: () => {
          ctx.categories.getAll.invalidate()
        },
      },
    )
    await createMutateAsync(
      {
        amount,
        title,
        type: 'outcome',
      },
      {
        onSuccess: () => {
          ctx.transactions.getAll.invalidate()
        },
      },
    )
    reset()
    toggleSubtractAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleSubtractAmount(null)}
      title="Descontar"
    >
      <Box as="form" onSubmit={handleSubmit(handleSubtractAmount)}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input
              size="lg"
              placeholder="Ex: gasolina do carro"
              {...register('title')}
            />
            <FormErrorMessage>
              {errors.title && errors.title?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel fontSize="md">Valor</FormLabel>
            <Input
              size="lg"
              type="number"
              placeholder="R$"
              {...register('amount', { valueAsNumber: true, value: 0 })}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount?.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            size="lg"
            colorScheme="green"
            isLoading={isSubmitting}
          >
            Descontar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import { api } from '~/utils/api'

const addSalaryFormSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Valor precisar ser maior que 0' }),
})

type AddSalaryFormData = z.infer<typeof addSalaryFormSchema>

export function AddSalary() {
  const {
    addSalary: { isVisible },
    toggleAddSalary,
  } = useUiSlice()
  const { data } = api.categories.getAll.useQuery()
  const { mutateAsync: updateMutateAsync } = api.categories.update.useMutation()
  const { mutateAsync: createMutateAsync } =
    api.transactions.create.useMutation()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddSalaryFormData>({
    resolver: zodResolver(addSalaryFormSchema),
  })

  function handleAddSalary({ amount }: AddSalaryFormData) {
    data?.forEach(async (category) => {
      const totalAmount = (amount * category.percentage) / 100
      await updateMutateAsync({
        categoryId: category?.id,
        fields: {
          amount: (category?.amount ?? 0) + totalAmount,
        },
      })
      await createMutateAsync({
        amount,
        title: `Salário em ${category.title}`,
        type: 'income',
      })
    })
    reset()
    toggleAddSalary(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddSalary(null)}
      title="Adicionar salário"
    >
      <Box as="form" onSubmit={handleSubmit(handleAddSalary)}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="xl">Salário</FormLabel>
            <Input
              type="number"
              size="lg"
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
            colorScheme="green"
            size="lg"
            isLoading={isSubmitting}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

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
  Select,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUiSlice } from '../../../stores/ui-slice'
import { api } from '../../../utils/api'
import { Modal } from '../../UI/Modal'

const transferAmountFormSchema = z.object({
  amount: z
    .number({
      invalid_type_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Valor precisar ser maior que 0' }),
  destination: z.string(),
})

type TransferAmountFormData = z.infer<typeof transferAmountFormSchema>

export function TransferAmount() {
  const ctx = api.useContext()
  const [destination, setDestination] = useState('')
  const [options, setOptions] = useState([''])
  const {
    transferAmount: { isVisible, category },
    toggleTransferAmount,
  } = useUiSlice()
  const { data } = api.categories.getAll.useQuery()
  const { mutateAsync } = api.categories.update.useMutation()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransferAmountFormData>({
    resolver: zodResolver(transferAmountFormSchema),
    defaultValues: {
      destination: options[0],
    },
  })

  useEffect(() => {
    const options = data
      ?.map((category) => category.title)
      .filter((title) => title !== category?.title)

    if (!options) return

    setOptions(options)
    setDestination(options[0] ?? '')
  }, [category?.title, data])

  async function handleTransferAmount({ amount }: TransferAmountFormData) {
    if (!category) return
    const destinationCategory = data?.find(
      (category) => category.title === destination,
    )
    await mutateAsync(
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
    await mutateAsync(
      {
        categoryId: destinationCategory?.id ?? '',
        fields: {
          amount: (destinationCategory?.amount ?? 0) + amount,
        },
      },
      {
        onSuccess: () => {
          ctx.transactions.getAll.invalidate()
        },
      },
    )
    reset()
    toggleTransferAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleTransferAmount(null)}
      title={`Transferir de ${category?.title ?? 'Não encontrado'}`}
    >
      <Box as="form" onSubmit={handleSubmit(handleTransferAmount)}>
        <ModalBody as={VStack} spacing={2} alignItems="flex-start">
          <FormControl isInvalid={!!errors.destination}>
            <FormLabel fontSize="md">Para</FormLabel>
            <Select {...register('destination')}>
              {options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.destination && errors.destination?.message}
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
            Transferir
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

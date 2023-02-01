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
import { useGetCategories } from '../../../hooks/useGetCategories'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
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
  const [destination, setDestination] = useState('')
  const [options, setOptions] = useState([''])
  const {
    transferAmount: { isVisible, category },
    toggleTransferAmount,
  } = useUiSlice()
  const categories = useGetCategories()
  const { mutateAsync } = useUpdateCategory()
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
    const options = categories
      ?.map((category) => category.title)
      .filter((title) => title !== category?.title)

    if (!options) return

    setOptions(options!)
    setDestination(options[0])
  }, [categories, category?.title])

  function handleTransferAmount({ amount }: TransferAmountFormData) {
    const destinationCategory = categories?.find(
      (category) => category.title === destination,
    )
    mutateAsync({
      id: category?.id!,
      amount: category?.amount! - amount,
    })
    mutateAsync({
      id: destinationCategory?.id!,
      amount: destinationCategory?.amount! + amount,
    })
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
            disabled={isSubmitting}
          >
            Transferir
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

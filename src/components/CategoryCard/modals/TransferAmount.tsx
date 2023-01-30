import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Select,
  VStack,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { useGetCategories } from '../../../hooks/useGetCategories'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

export function TransferAmount() {
  const [destination, setDestination] = useState('')
  const [options, setOptions] = useState([''])
  const [amount, setAmount] = useState(0)
  const {
    transferAmount: { isVisible, category },
    toggleTransferAmount,
  } = useUiSlice()
  const categories = useGetCategories()
  const { mutateAsync } = useUpdateCategory()

  useEffect(() => {
    const options = categories
      ?.map((category) => category.title)
      .filter((title) => title !== category?.title)

    if (!options) return

    setOptions(options)
    setDestination(options[0])
  }, [categories, category?.title])

  function handleTransferAmount(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    const destinationCategory = categories?.find(
      (category) => category.title === destination,
    )
    mutateAsync({
      id: category?.id!,
      amount: category?.amount! - amount,
    })
    mutateAsync({
      id: destinationCategory?.id!,
      amount: category?.amount! + amount,
    })
    setAmount(0)
    toggleTransferAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleTransferAmount(null)}
      title={`Transferir de ${category?.title ?? 'Não encontrado'}`}
    >
      <Box as="form" onSubmit={handleTransferAmount}>
        <ModalBody as={VStack} spacing={2} alignItems="flex-start">
          <FormControl>
            <FormLabel fontSize="md">Para</FormLabel>
            <Select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="md">Valor</FormLabel>
            <Input
              size="lg"
              type="number"
              placeholder="R$"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" size="lg" colorScheme="green">
            Transferir
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

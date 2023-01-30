import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

export function SubtractAmount() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const {
    subtractAmount: { category, isVisible },
    toggleSubtractAmount,
  } = useUiSlice()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleSubtractAmount(e: FormEvent) {
    e.preventDefault()
    if (!title || !amount) return
    updateMutateAsync({
      id: category?.id!,
      amount: category?.amount! - amount,
    })
    createMutateAsync({
      amount,
      title,
      type: 'outcome',
    })
    setTitle('')
    setAmount(0)
    toggleSubtractAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleSubtractAmount(null)}
      title="Descontar"
    >
      <Box as="form" onSubmit={handleSubtractAmount}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input
              size="lg"
              placeholder="Ex: gasolina do carro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
            Descontar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

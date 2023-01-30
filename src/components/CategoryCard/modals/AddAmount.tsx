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

export function AddAmount() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const {
    addAmount: { category, isVisible },
    toggleAddAmount,
  } = useUiSlice()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleAddAmount(e: FormEvent) {
    e.preventDefault()
    if (!title || !amount) return
    updateMutateAsync({
      id: category?.id!,
      amount: category?.amount! + amount,
    })
    createMutateAsync({
      amount,
      title,
      type: 'income',
    })
    setTitle('')
    setAmount(0)
    toggleAddAmount(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddAmount(null)}
      title="Adicionar"
    >
      <Box as="form" onSubmit={handleAddAmount}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input
              size="lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="gray.800"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="md">Valor</FormLabel>
            <Input
              type="number"
              size="lg"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" size="lg" colorScheme="green">
            Adicionar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

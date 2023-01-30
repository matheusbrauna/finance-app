import {
  ModalBody,
  Box,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useCreateTransaction } from '../../../hooks/useCreateTransaction'
import { useGetCategories } from '../../../hooks/useGetCategories'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

export function AddSalary() {
  const [amount, setAmount] = useState(0)
  const {
    addSalary: { isVisible },
    toggleAddSalary,
  } = useUiSlice()
  const categories = useGetCategories()
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: createMutateAsync } = useCreateTransaction()

  function handleAddSalary(e: FormEvent) {
    e.preventDefault()
    if (!amount) return
    categories?.forEach((category) => {
      const totalAmount = (amount * category.percentage) / 100
      updateMutateAsync({
        id: category?.id,
        amount: category?.amount! + totalAmount,
      })
      createMutateAsync({
        amount,
        title: `Salário em ${category.title}`,
        type: 'income',
      })
    })
    setAmount(0)
    toggleAddSalary(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddSalary(null)}
      title="Adicionar salário"
    >
      <Box as="form" onSubmit={handleAddSalary}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="xl">Salário</FormLabel>
            <Input
              type="number"
              size="lg"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="green" size="lg">
            Adicionar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

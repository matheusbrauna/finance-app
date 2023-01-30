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
import { useCreateCategory } from '../../../hooks/useCreateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

export function AddCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { mutateAsync } = useCreateCategory()
  const {
    toggleAddCategory,
    addCategory: { isVisible },
  } = useUiSlice()

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    await mutateAsync({
      title,
      percentage,
    })
    setPercentage(0)
    setTitle('')
    toggleAddCategory(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddCategory(null)}
      title="Nova Categoria"
    >
      <Box as="form" onSubmit={handleAddCategory}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input
              size="lg"
              placeholder="Essencial"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="md">Porcentagem Alocada</FormLabel>
            <Input
              size="lg"
              type="number"
              placeholder="%"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" size="lg" colorScheme="green">
            Salvar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

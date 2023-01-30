import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  VStack,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useDeleteCategory } from '../../../hooks/useDeleteCategory'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

export function EditCategory() {
  const [title, setTitle] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: deleteMutateAsync } = useDeleteCategory()
  const {
    editCategory: { category, isVisible },
    toggleEditCategory,
  } = useUiSlice()

  async function handleEditCategory(e: FormEvent) {
    e.preventDefault()
    if (!title || !percentage) return
    await updateMutateAsync({
      id: category?.id!,
      percentage,
      title,
    })
    setTitle('')
    setPercentage(0)
    toggleEditCategory(null)
  }

  async function handleRemoveCategory() {
    await deleteMutateAsync(category?.id!)
    setTitle('')
    setPercentage(0)
    toggleEditCategory(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleEditCategory(null)}
      title="Editar"
    >
      <Box as="form" onSubmit={handleEditCategory}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input
              size="lg"
              value={title}
              placeholder={category?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="md">Porcentagem Alocada</FormLabel>
            <Input
              type="number"
              size="lg"
              placeholder="%"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter as={HStack} spacing={2}>
          <Button type="submit" size="lg" colorScheme="green">
            Salvar
          </Button>

          <Button
            type="button"
            size="lg"
            colorScheme="red"
            variant="outline"
            onClick={handleRemoveCategory}
          >
            Excluir
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

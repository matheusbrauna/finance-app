import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDeleteCategory } from '../../../hooks/useDeleteCategory'
import { useUpdateCategory } from '../../../hooks/useUpdateCategory'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'

const editCategoryFormSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório!' }),
  percentage: z
    .number({
      invalid_type_error: '',
    })
    .min(1, { message: 'Valor deve ser algo entre 1 e 100!' })
    .max(100, { message: 'Valor deve ser algo entre 1 e 100!' }),
})

type EditCategoryFormData = z.infer<typeof editCategoryFormSchema>

export function EditCategory() {
  const { mutateAsync: updateMutateAsync } = useUpdateCategory()
  const { mutateAsync: deleteMutateAsync, isLoading } = useDeleteCategory()
  const {
    editCategory: { category, isVisible },
    toggleEditCategory,
  } = useUiSlice()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategoryFormSchema),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  async function handleEditCategory({
    percentage,
    title,
  }: EditCategoryFormData) {
    await updateMutateAsync({
      id: category?.id!,
      updateFields: {
        percentage,
        title,
      },
    })
    reset()
    toggleEditCategory(null)
  }

  async function handleRemoveCategory() {
    await deleteMutateAsync({
      id: category?.id!,
    })
    toggleEditCategory(null)
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isVisible}
        onClose={() => toggleEditCategory(null)}
        title="Editar"
      >
        <Box as="form" onSubmit={handleSubmit(handleEditCategory)}>
          <ModalBody as={VStack} spacing={2}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="md">Título</FormLabel>
              <Input
                size="lg"
                placeholder={category?.title}
                {...register('title')}
              />
              <FormErrorMessage>
                {errors.title && errors.title?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.percentage}>
              <FormLabel fontSize="md">Porcentagem Alocada</FormLabel>
              <Input
                type="number"
                size="lg"
                placeholder={`${category?.percentage}%`}
                {...register('percentage', { valueAsNumber: true, value: 0 })}
              />
              <FormErrorMessage>
                {errors.percentage && errors.percentage?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter as={HStack} spacing={2}>
            <Button
              type="button"
              size="lg"
              colorScheme="red"
              variant="outline"
              onClick={onOpen}
              isLoading={isLoading}
            >
              Excluir
            </Button>
            <Button
              type="submit"
              size="lg"
              colorScheme="green"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </ModalFooter>
        </Box>
      </Modal>
      <AlertDialog
        size={['xs', 'xl']}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Você realmente deseja a categoria {category?.title}?
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleRemoveCategory} ml={3}>
                Sim, quero!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

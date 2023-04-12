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
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUiSlice } from '../../../stores/ui-slice'
import { Modal } from '../../UI/Modal'
import { api } from '~/utils/api'

const addCategoryFormSchema = z.object({
  title: z.string().min(1, { message: 'Campo obrigatório!' }),
  percentage: z
    .number()
    .min(1, { message: 'Valor deve ser algo entre 1 e 100!' })
    .max(100, { message: 'Valor deve ser algo entre 1 e 100!' }),
})

type AddCategoryFormData = z.infer<typeof addCategoryFormSchema>

export function AddCategory() {
  const { mutateAsync } = api.categories.create.useMutation()
  const {
    toggleAddCategory,
    addCategory: { isVisible },
  } = useUiSlice()
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddCategoryFormData>({
    resolver: zodResolver(addCategoryFormSchema),
  })

  async function handleAddCategory({ title, percentage }: AddCategoryFormData) {
    await mutateAsync({
      title,
      percentage,
    })
    reset()
    toggleAddCategory(null)
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => toggleAddCategory(null)}
      title="Nova Categoria"
    >
      <Box as="form" onSubmit={handleSubmit(handleAddCategory)}>
        <ModalBody as={VStack} spacing={2}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel fontSize="md">Título</FormLabel>
            <Input size="lg" placeholder="Essencial" {...register('title')} />
            <FormErrorMessage>
              {errors.title && errors.title?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.percentage}>
            <FormLabel fontSize="md">Porcentagem Alocada</FormLabel>
            <Input
              size="lg"
              type="number"
              placeholder="%"
              {...register('percentage', { valueAsNumber: true, value: 0 })}
            />
            <FormErrorMessage>
              {errors.percentage && errors.percentage?.message}
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
            Salvar
          </Button>
        </ModalFooter>
      </Box>
    </Modal>
  )
}

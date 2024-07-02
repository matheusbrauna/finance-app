import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { CategoryForm } from './category-form'

const formSchema = insertCategorySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory()

  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza?',
    'Você está prestes a excluir essa categoria.',
  )

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isPending = editMutation.isPending || deleteMutation.isPending
  const isLoading = categoryQuery.isLoading

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  async function onDelete() {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        },
      })
    }
  }

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar categoria</SheetTitle>
            <SheetDescription>Edite uma categoria existente.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

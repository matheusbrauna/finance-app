import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useCreateCategory } from '@/features/categories/api/use-create-category'
import { CategoryForm } from './category-form'

const formSchema = insertCategorySchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory()

  const mutation = useCreateCategory()

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nova categoria</SheetTitle>
          <SheetDescription>
            Crie uma nova categoria para organizar suas transações.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

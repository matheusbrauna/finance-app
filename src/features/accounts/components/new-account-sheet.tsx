import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { AccountForm } from './account-form'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount()

  const mutation = useCreateAccount()

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
          <SheetTitle>Nova conta</SheetTitle>
          <SheetDescription>
            Crie uma nova conta para rastrear suas transações.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
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

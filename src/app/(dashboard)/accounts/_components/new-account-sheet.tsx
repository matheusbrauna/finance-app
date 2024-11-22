import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { insertAccountSchema } from '@/db/schema'
import { toast } from 'sonner'
import type { z } from 'zod'
import { useServerAction } from 'zsa-react'
import { createAccount } from '../_actions/create-account'
import { useNewAccount } from '../_hooks/use-new-account'
import { AccountForm } from './account-form'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount()

  const { execute, isPending } = useServerAction(createAccount, {
    onSuccess: ({ data }) => {
      toast.success(`Conta '${data.name}' criada!`)
      onClose()
    },
  })

  function onSubmit(values: FormValues) {
    execute(values)
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
          disabled={isPending}
          defaultValues={{
            name: '',
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

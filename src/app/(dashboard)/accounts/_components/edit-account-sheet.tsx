import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { insertAccountSchema } from '@/db/schema'
import { useConfirm } from '@/hooks/use-confirm'
import { Loader2 } from 'lucide-react'
import type { z } from 'zod'
import { useOpenAccount } from '../_hooks/use-open-account'
import { AccountForm } from './account-form'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

export function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount()

  const [ConfirmDialog, confirm] = useConfirm(
    'Você tem certeza?',
    'Você está prestes a excluir essa conta.'
  )

  // TODO: Migrate to server actions

  // const editMutation = useEditAccount(id)
  // const deleteMutation = useDeleteAccount(id)

  // const isPending = editMutation.isPending || deleteMutation.isPending
  const isLoading = false

  // function onSubmit(values: FormValues) {
  //   editMutation.mutate(values, {
  //     onSuccess: () => {
  //       onClose()
  //     },
  //   })
  // }

  // async function onDelete() {
  //   const ok = await confirm()

  //   if (ok) {
  //     deleteMutation.mutate(undefined, {
  //       onSuccess: () => {
  //         onClose()
  //       },
  //     })
  //   }
  // }

  // const defaultValues = accountQuery.data
  //   ? {
  //       name: accountQuery.data.name,
  //     }
  //   : {
  //       name: '',
  //     }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar conta</SheetTitle>
            <SheetDescription>Edite uma conta já existente.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={() => {}}
              disabled={false}
              defaultValues={{
                name: '',
              }}
              onDelete={() => {}}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { insertTransactionSchema } from '@/db/schema'
import { useCreateTransaction } from '@/features/transactions/api/use-create-transaction'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useCreateCategory } from '@/features/categories/api/use-create-category'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { TransactionForm } from './transaction-form'
import { Loader2 } from 'lucide-react'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'

const formSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>

export function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction()

  const transactionMutation = useCreateTransaction()

  const categoryQuery = useGetCategories()
  const categoryMutation = useCreateCategory()
  function onCreateCategory(name: string) {
    categoryMutation.mutate({
      name,
    })
  }
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }))

  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  function onCreateAccount(name: string) {
    accountMutation.mutate({
      name,
    })
  }
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))

  const isPending =
    transactionMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading

  function onSubmit(values: FormValues) {
    transactionMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nova transação</SheetTitle>
          <SheetDescription>Crie uma nova transação.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

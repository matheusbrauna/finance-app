'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react'
import { columns } from '@/app/(dashboard)/transactions/columns'
import { transactions as transactionSchema } from '@/db/schema'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useState } from 'react'
import { UploadButton } from '@/app/(dashboard)/transactions/upload-button'
import { ImportCard } from '@/app/(dashboard)/transactions/import-card'
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account'
import { toast } from 'sonner'
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
}

export default function TransactionsPage() {
  const [AccountDialog, confirm] = useSelectAccount()
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

  function onUpload(results: typeof INITIAL_IMPORT_RESULTS) {
    setImportResults(results)
    setVariant(VARIANTS.IMPORT)
  }

  function onCancelImport() {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  const onOpen = useNewTransaction((state) => state.onOpen)
  const createTransactions = useBulkCreateTransactions()
  const deleteTransactions = useBulkDeleteTransactions()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const isDisable = deleteTransactions.isPending || transactionsQuery.isLoading

  async function onSubmitImport(
    values: (typeof transactionSchema.$inferInsert)[],
  ) {
    const accountId = await confirm()

    if (!accountId) {
      return toast.error('Por favor, selecione uma conta para continuar')
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }))

    createTransactions.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      },
    })
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Histórico de transações
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as suas transações.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={onOpen} className="w-full lg:w-auto">
            <Plus className="mr-2 size-4" />
            Adicionar nova transação
          </Button>
          <UploadButton onUpload={onUpload} />
        </div>
      </div>
      <DataTable
        filterKeyLabel="Buscar destinatário..."
        filterKey="payee"
        columns={columns}
        data={transactions}
        onDelete={(rows) => {
          const ids = rows.map((row) => row.original.id)
          deleteTransactions.mutate({ ids })
        }}
        disabled={isDisable}
      />
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts'

export default function AccountsPage() {
  const onOpen = useNewAccount((state) => state.onOpen)
  const deleteAccounts = useBulkDeleteAccounts()
  const accountsQuery = useGetAccounts()
  const accounts = accountsQuery.data || []

  const isDisable = deleteAccounts.isPending || accountsQuery.isLoading

  if (accountsQuery.isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex h-[500px] w-full items-center justify-center">
          <Loader2 className="size-6 animate-spin text-slate-300" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sua contas</h2>
          <p className="text-sm text-muted-foreground">Gerencie suas contas.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={onOpen}>
            <Plus className="mr-2 size-4" />
            Adicionar nova conta
          </Button>
        </div>
      </div>
      <DataTable
        filterKeyLabel="Buscar conta..."
        filterKey="name"
        columns={columns}
        data={accounts}
        onDelete={(rows) => {
          const ids = rows.map((row) => row.original.id)
          deleteAccounts.mutate({ ids })
        }}
        disabled={isDisable}
      />
    </div>
  )
}

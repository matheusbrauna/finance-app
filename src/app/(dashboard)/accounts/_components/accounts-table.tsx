import { getAccounts } from '@/app/(dashboard)/accounts/_queries/get-accounts'
import { DataTable } from '@/components/data-table'
import { columns } from './columns'

export async function AccountsTable() {
  const accounts = await getAccounts()

  return (
    <DataTable
      filterKeyLabel="Buscar conta..."
      filterKey="name"
      columns={columns}
      data={accounts}
      onDelete={async rows => {
        'use server'
        const ids = rows.map(row => row.original.id)
      }}
    />
  )
}

import { Suspense } from 'react'
import { AccountsHeader } from './_components/accounts-header'
import { AccountsTable } from './_components/accounts-table'

export default function Accounts() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <AccountsHeader />
      <Suspense fallback="Carregando...">
        <AccountsTable />
      </Suspense>
    </div>
  )
}

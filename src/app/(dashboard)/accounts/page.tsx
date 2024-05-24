'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Plus } from 'lucide-react'
import { Payment, columns } from './columns'
import { DataTable } from '@/components/data-table'

const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'fdgfdfdfd',
    amount: 1000,
    status: 'pending',
    email: 'm2@example.com',
  },
  {
    id: '728ed52dsf',
    amount: 4345,
    status: 'pending',
    email: 'm3@example.com',
  },
]

export default function AccountsPage() {
  const onOpen = useNewAccount((state) => state.onOpen)

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Accounts page</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="email"
            columns={columns}
            data={payments}
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}

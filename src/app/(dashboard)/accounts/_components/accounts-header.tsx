'use client'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNewAccount } from '../_hooks/use-new-account'

export function AccountsHeader() {
  const { onOpen, isOpen } = useNewAccount()

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
      <PageHeader>
        <PageHeaderHeading size="sm">Sua contas</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Gerencie suas contas.
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={onOpen}>
          <Plus className="mr-2 size-4" />
          Adicionar nova conta
        </Button>
      </div>
    </div>
  )
}

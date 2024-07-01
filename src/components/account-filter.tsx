'use client'

import qs from 'query-string'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetSummary } from '@/features/summary/api/use-get-summary'

export function AccountFilter() {
  const router = useRouter()
  const pathname = usePathname()

  const params = useSearchParams()
  const accountId = params.get('accountId') || 'all'
  const from = params.get('from') || ''
  const to = params.get('to') || ''
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()
  const { isLoading: isLoadingSummary } = useGetSummary()

  function onChange(newValue: string) {
    const query = {
      accountId: newValue,
      from,
      to,
    }

    if (newValue === 'all') {
      query.accountId = ''
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    )

    router.push(url)
  }

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Seleciona uma conta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as contas</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import { FaPiggyBank } from 'react-icons/fa'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6'
import { useGetSummary } from '@/features/summary/api/use-get-summary'
import { formatDateRange } from '@/lib/utils'
import { DataCard, DataCardLoading } from '@/components/data-card'

export function DataGrid() {
  const { data, isLoading } = useGetSummary()

  const params = useSearchParams()
  const to = params.get('to') ?? undefined
  const from = params.get('from') ?? undefined
  const dateRangeLabel = formatDateRange({ to, from })

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    )
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
      <DataCard
        title="Saldo Restante"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Renda"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        dateRange={dateRangeLabel}
        variant="success"
      />
      <DataCard
        title="Despesas"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        dateRange={dateRangeLabel}
        variant="danger"
      />
    </div>
  )
}

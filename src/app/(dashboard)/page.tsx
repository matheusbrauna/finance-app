import { AccountFilter } from '@/components/account-filter'
import { DataCharts } from '@/components/data-charts'
import { DataGrid } from '@/components/data-grid'
import { DateFilter } from '@/components/date-filter'

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Resumo</h2>
            <p className="text-sm text-muted-foreground">
              Resumo das suas finanças.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DateFilter />
            <AccountFilter />
          </div>
        </div>
        <DataGrid />
        <DataCharts />
      </div>
    </div>
  )
}

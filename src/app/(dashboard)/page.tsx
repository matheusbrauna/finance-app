import { AccountFilter } from '@/components/account-filter'
import { DataCharts } from '@/components/data-charts'
import { DataGrid } from '@/components/data-grid'
import { DateFilter } from '@/components/date-filter'
import { WelcomeMsg } from '@/components/welcome-msg'

export default function DashboardPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
          <WelcomeMsg />
          <div className="flex flex-col gap-4 sm:flex-row">
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

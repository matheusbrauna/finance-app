import { AccountFilter } from './account-filter'

export function Filters() {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      <AccountFilter />
    </div>
  )
}
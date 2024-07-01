import { SiteHeader } from '@/components/layouts/site-header'
import { ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}

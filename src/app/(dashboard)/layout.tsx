import { SiteHeader } from '@/components/layouts/site-header'
import { SheetProvider } from '@/components/sheet-provider'
import { getCachedUser } from '@/lib/queries/user'

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const user = await getCachedUser()

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SiteHeader user={user} />
        <main className="flex-1">{children}</main>
      </div>
      <SheetProvider />
    </>
  )
}

import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { Navigation } from '@/components/layouts/navigation'

export function SiteHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <div className="flex items-center space-x-4">
          <Navigation />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
        </div>
      </div>
    </div>
  )
}

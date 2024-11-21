import { Navigation } from '@/components/layouts/navigation'
import { UserNav } from '@/components/layouts/user-nav'
import { ModeToggle } from '@/components/mode-toggle'
import type { User } from 'better-auth'

type Props = {
  user: User
}

export function SiteHeader({ user }: Props) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <div className="flex items-center space-x-4">
          <Navigation />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <UserNav user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

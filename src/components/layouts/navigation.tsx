'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useMedia } from 'react-use'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icons } from '../icons'
import { siteConfig } from '@/config/site'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMedia('(max-width: 1024px)', false)

  const onClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal text-foreground outline-none transition focus-visible:ring-offset-0"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            <Link href="/" className="mb-4 flex items-center">
              <Icons.logo className="mr-2 h-6 w-6" />
              <span className="font-bold sm:inline-block">Finance App</span>
            </Link>
            {siteConfig.mainNav.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? 'default' : 'ghost'}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className={cn('hidden items-center space-x-4 lg:flex lg:space-x-6')}>
      <Link href="/" className="flex items-center">
        <Icons.logo className="mr-2 h-6 w-6" />
        <span className="font-bold sm:inline-block">Finance App</span>
      </Link>
      {siteConfig.mainNav.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary/70',
            route.href === pathname
              ? 'text-primary hover:text-primary/90'
              : 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

import '@/styles/globals.css'
import { ptBR } from '@clerk/localizations'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'
import { QueryProvider } from '@/providers/query-provider'
import { ReactNode } from 'react'
import { SheetProvider } from '@/providers/sheet-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Finance',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

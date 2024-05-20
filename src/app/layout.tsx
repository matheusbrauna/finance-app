import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Finance',
}

type Props = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

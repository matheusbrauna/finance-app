import '@/styles/globals.css'
import { ptBR } from '@clerk/localizations'
import type { Metadata, Viewport } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'
import { QueryProvider } from '@/providers/query-provider'
import { ReactNode } from 'react'
import { SheetProvider } from '@/providers/sheet-provider'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  generator: 'Next.js',
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Controle de finanças'],
  authors: [
    {
      name: 'Matheus Braúna',
      url: siteConfig.links.linkedin,
    },
  ],
  creator: 'Matheus Braúna',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <SheetProvider />
              <Toaster />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

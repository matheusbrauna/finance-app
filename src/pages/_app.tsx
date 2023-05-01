import '../lib/dayjs'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { api } from '../utils/api'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { ptBR } from '@clerk/localizations'

const publicPages = ['/sign-in/[[...index]]']

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)

  return (
    <ClerkProvider localization={ptBR} {...pageProps}>
      <ChakraProvider theme={theme} resetCSS>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
        <Toaster position="top-right" />
      </ChakraProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(App)

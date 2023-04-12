import { ChakraProvider } from '@chakra-ui/react'
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { type AppType } from 'next/app'
import { useRouter } from 'next/router'
import { theme } from '~/styles/theme'

import { api } from '~/utils/api'

const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]']

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)

  return (
    <ClerkProvider {...pageProps}>
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
      </ChakraProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)

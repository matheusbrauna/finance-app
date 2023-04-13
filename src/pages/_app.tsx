import '~/lib/dayjs'
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
import { Toaster } from 'react-hot-toast'

const publicPages = ['/sign-in/[[...index]]']

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
        <Toaster position="top-right" />
      </ChakraProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp)

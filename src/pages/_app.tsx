import '../lib/dayjs'
import type { AppProps } from 'next/app'
import {
  Hydrate,
  HydrateProps,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { useState } from 'react'

export default function App({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps<{ session: Session; dehydratedState: HydrateProps['state'] }>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

import '../lib/dayjs'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { trpc } from '../utils/trpc'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)

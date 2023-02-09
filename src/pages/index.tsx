import { useSession } from 'next-auth/react'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import { VStack, Spinner, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

export default function Home() {
  const { status } = useSession()

  const { push } = useRouter()

  const redirectToLoginPage = useCallback(async () => {
    if (status === 'unauthenticated') {
      await push('/login')
    }
  }, [push, status])

  useEffect(() => {
    redirectToLoginPage()
  }, [redirectToLoginPage])

  return (
    <>
      {status === 'loading' && (
        <Center h="100vh">
          <Spinner />
        </Center>
      )}
      {status === 'authenticated' && (
        <VStack p={4} spacing={10} align="stretch">
          <Header />
          <AllCards />
          <Charts />
          <Transactions />
        </VStack>
      )}
    </>
  )
}

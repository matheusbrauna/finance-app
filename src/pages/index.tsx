import { useSession } from 'next-auth/react'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'

export default function Home() {
  const { status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      push('/login')
    }
  }, [push, status])

  return (
    <>
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

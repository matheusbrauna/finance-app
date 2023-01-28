import { useSession } from 'next-auth/react'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import styles from '../styles/initial.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
        <main className={styles.main}>
          <Header />
          <AllCards />
          <Charts />
          <Transactions />
        </main>
      )}
    </>
  )
}

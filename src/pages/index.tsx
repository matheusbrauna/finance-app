import { useSession } from 'next-auth/react'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import styles from '../styles/initial.module.scss'
import { useRouter } from 'next/router'

export default function Home() {
  const { status } = useSession()
  const { push } = useRouter()

  if (status === 'unauthenticated') {
    push('/login')
  }

  return (
    <>
      <main className={styles.main}>
        <Header />
        <AllCards />
        <Charts />
        <Transactions />
      </main>
    </>
  )
}

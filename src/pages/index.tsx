import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import styles from '../styles/initial.module.scss'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'

export default function Home() {
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, {})

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

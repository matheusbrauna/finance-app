import { useDispatch } from 'react-redux'
import { AllCards } from '../components/CategoryCard/AllCards'
import { Charts } from '../components/Charts/Charts'
import { Header } from '../components/Header/Header'
import { Transactions } from '../components/Transactions/Transactions'
import { useGetDocs } from '../hooks/useGetDocs'
import { setCategories, setTransactions } from '../store/slices/app-slice'
import styles from '../styles/initial.module.scss'

export default function Home() {
  const dispatch = useDispatch()
  dispatch(setCategories(useGetDocs('categories')))
  dispatch(setTransactions(useGetDocs('transactions')))

  return (
    <main className={styles.main}>
      <Header />
      <AllCards />
      <Charts />
      <Transactions />
    </main>
  )
}

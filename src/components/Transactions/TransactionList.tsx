import { useGetTransactions } from '../../hooks/useGetTransactions'
import { TransactionCard } from './TransactionCard'
import styles from './TransactionList.module.scss'

interface TransactionListProps {
  title: string
  type: string
}

export function TransactionList({ title, type }: TransactionListProps) {
  const transactions = useGetTransactions()
  const transactionsData = transactions
    ?.filter((transaction) => transaction.type.toLowerCase() === type)
    .slice(0, 8)
    .map((el) => <TransactionCard key={el.id} transaction={el} />)

  return (
    <div className={styles.transactions}>
      <h2>{title}</h2>
      <div>
        <ul className={styles.list}>{transactionsData}</ul>
      </div>
    </div>
  )
}

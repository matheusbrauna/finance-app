import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TransactionCard } from './TransactionCard'
import styles from './TransactionList.module.scss'

interface TransactionListProps {
  title: string
  type: string
}

export function TransactionList({ title, type }: TransactionListProps) {
  const transactions = useSelector((state: RootState) => state.app.transactions)
    .filter((transaction) => transaction.type.toLowerCase() === type)
    .sort((a, b) => b.date?.toDate() - a.date?.toDate())
    .slice(0, 8)
    .map((el) => <TransactionCard key={el.id} transaction={el} />)

  console.log(transactions)

  return (
    <div className={styles.transactions}>
      <h2>{title}</h2>
      <div>
        <ul className={styles.list}>{transactions}</ul>
      </div>
    </div>
  )
}

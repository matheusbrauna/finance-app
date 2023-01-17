import { TbCurrencyDollar } from 'react-icons/tb'
import { useGetCurrency } from '../../hooks/useGetCurrency'
import { useGetDate } from '../../hooks/useGetDate'
import { Transaction } from '../../store/@types/AppSlice'
import styles from './TransactionCard.module.scss'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { currency } = useGetCurrency(transaction.amount)
  const formattedDate = useGetDate(transaction.date)

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <div className={`${styles.icon} ${styles[transaction.type]}`}>
          <TbCurrencyDollar />
        </div>
        <div>
          <h3>{transaction.title}</h3>
          <h4>{formattedDate}</h4>
        </div>
      </div>
      <div className={styles.price}>
        <span className={styles[transaction.type]}>{currency}</span>
      </div>
    </li>
  )
}

import { Transaction } from '@prisma/client'
import { TbCurrencyDollar } from 'react-icons/tb'
import { useGetCurrency } from '../../hooks/useGetCurrency'
import styles from './TransactionCard.module.scss'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { currency } = useGetCurrency(transaction.amount)

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <div className={`${styles.icon} ${styles[transaction.type]}`}>
          <TbCurrencyDollar />
        </div>
        <div>
          <h3>{transaction.title}</h3>
          <h4>{transaction.date.toString()}</h4>
        </div>
      </div>
      <div className={styles.price}>
        <span className={styles[transaction.type]}>{currency}</span>
      </div>
    </li>
  )
}

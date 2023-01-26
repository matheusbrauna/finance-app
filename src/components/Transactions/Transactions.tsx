import styles from './Transactions.module.scss'
import { TransactionList } from './TransactionList'

export function Transactions() {
  return (
    <section className={styles.section}>
      <TransactionList title="Entradas" type="income" />
      <TransactionList title="Despesas" type="outcome" />
    </section>
  )
}

import { Balance } from './Balance'
import { CategoriesPie } from './CategoriesPie'
import styles from './Charts.module.scss'

export function Charts() {
  return (
    <section className={styles.graph}>
      <Balance />
      <CategoriesPie />
    </section>
  )
}

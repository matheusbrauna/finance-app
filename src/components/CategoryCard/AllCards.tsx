import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import styles from './AllCards.module.scss'
import { CategoryCard } from './CategoryCard'
import { AddAmount } from './modals/AddAmount'
import { AddCategory } from './modals/AddCategory'
import { EditCategory } from './modals/EditCategory'
import { SubtractAmount } from './modals/SubtractAmount'
import { TransferAmount } from './modals/TransferAmount'
import { NoCard } from './NoCard'

export function AllCards() {
  const { categories } = useSelector((state: RootState) => state.app)
  const cards = categories?.map((category) => (
    <CategoryCard key={category.id} data={category} />
  ))

  return (
    <>
      <AddAmount />
      <SubtractAmount />
      <TransferAmount />
      <EditCategory />
      <AddCategory />
      <section className={styles.section}>
        {cards}
        <NoCard />
      </section>
    </>
  )
}

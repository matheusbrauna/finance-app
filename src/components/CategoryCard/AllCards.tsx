import { useGetCategories } from '../../hooks/useGetCategories'
import styles from './AllCards.module.scss'
import { CategoryCard } from './CategoryCard'
import { AddAmount } from './modals/AddAmount'
import { AddCategory } from './modals/AddCategory'
import { EditCategory } from './modals/EditCategory'
import { SubtractAmount } from './modals/SubtractAmount'
import { TransferAmount } from './modals/TransferAmount'
import { NoCard } from './NoCard'

export function AllCards() {
  const categories = useGetCategories()

  return (
    <>
      <AddAmount />
      <SubtractAmount />
      <TransferAmount />
      <EditCategory />
      <AddCategory />
      <section className={styles.section}>
        {categories?.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
        <NoCard />
      </section>
    </>
  )
}

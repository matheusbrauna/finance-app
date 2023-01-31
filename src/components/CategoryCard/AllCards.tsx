import { Center, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useGetCategories } from '../../hooks/useGetCategories'
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
      <SimpleGrid minChildWidth={['full', '20rem']} gap={5}>
        {!categories && (
          <Center minH="full" h={['32', '36']}>
            <Spinner />
          </Center>
        )}
        {categories?.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
        <NoCard />
      </SimpleGrid>
      <AddAmount />
      <SubtractAmount />
      <TransferAmount />
      <EditCategory />
      <AddCategory />
    </>
  )
}

import { Center, SimpleGrid, Spinner } from '@chakra-ui/react'
import { CategoryCard } from './CategoryCard'
import { NoCard } from './NoCard'
import { AddCategory } from './modals/AddCategory'
import { EditCategory } from './modals/EditCategory'
import { SubtractAmount } from './modals/SubtractAmount'
import { TransferAmount } from './modals/TransferAmount'
import { api } from '../../utils/api'
import { AddAmount } from './modals/AddAmount'

export function AllCards() {
  const { data } = api.categories.getAll.useQuery()

  if (!data)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  return (
    <>
      <SimpleGrid minChildWidth={['full', '20rem']} gap={5}>
        {data.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
        <NoCard />
      </SimpleGrid>
      <AddAmount />
      <AddCategory />
      <EditCategory />
      <SubtractAmount />
      <TransferAmount />
    </>
  )
}

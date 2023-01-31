import { Card, Heading, Icon, VStack } from '@chakra-ui/react'
import { TbPlus } from 'react-icons/tb'
import { useGetCategories } from '../../hooks/useGetCategories'
import { useUiSlice } from '../../stores/ui-slice'

export function NoCard() {
  const { toggleAddCategory } = useUiSlice()
  const categories = useGetCategories()

  return (
    <VStack align="stretch" justify="center" spacing={4}>
      {categories?.length! < 1 && (
        <Heading fontSize="lg" textAlign="center" color="gray.200">
          Clique para adicionar uma nova categoria!
        </Heading>
      )}
      <Card
        onClick={() => toggleAddCategory(null)}
        display="grid"
        placeItems="center"
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{
          transform: 'translateY(-8px)',
        }}
        dropShadow="2xl"
        border="1px solid"
        borderColor="green.300"
        minH="full"
        h={['32', '36']}
      >
        <Icon as={TbPlus} fontSize="6xl" color="green.300" />
      </Card>
    </VStack>
  )
}

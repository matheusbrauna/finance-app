import { Grid, GridItem } from '@chakra-ui/react'
import { Balance } from './Balance'
import { CategoriesPie } from './CategoriesPie'

export function Charts() {
  return (
    <Grid
      gridTemplateColumns={[
        'repeat(1, minmax(0, 1fr))',
        'repeat(2, minmax(0, 1fr))',
      ]}
      bg="gray.700"
      gap="6"
      p="4"
      rounded="lg"
      shadow="md"
    >
      <GridItem>
        <Balance />
      </GridItem>
      <GridItem>
        <CategoriesPie />
      </GridItem>
    </Grid>
  )
}

import { TransactionList } from './TransactionList'
import { Stack } from '@chakra-ui/react'

export function Transactions() {
  return (
    <Stack
      direction={['column', 'column', 'row']}
      align="stretch"
      spacing="10"
      bg="gray.700"
      p="4"
      rounded="lg"
      shadow="lg"
    >
      <TransactionList title="Entradas" type="income" />
      <TransactionList title="Despesas" type="outcome" />
    </Stack>
  )
}

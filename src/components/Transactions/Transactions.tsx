import { TransactionList } from './TransactionList'
import { HStack } from '@chakra-ui/react'

export function Transactions() {
  return (
    <HStack
      align="stretch"
      spacing="12"
      bg="gray.700"
      p="4"
      rounded="lg"
      shadow="lg"
    >
      <TransactionList title="Entradas" type="income" />
      <TransactionList title="Despesas" type="outcome" />
    </HStack>
  )
}

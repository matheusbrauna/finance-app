import { Box, Heading, List } from '@chakra-ui/react'
import { useGetTransactions } from '../../hooks/useGetTransactions'
import { TransactionCard } from './TransactionCard'

interface TransactionListProps {
  title: string
  type: string
}

export function TransactionList({ title, type }: TransactionListProps) {
  const transactions = useGetTransactions()
  const transactionsData = transactions
    ?.filter((transaction) => transaction.type.toLowerCase() === type)
    .slice(0, 8)
    .map((el) => <TransactionCard key={el.id} transaction={el} />)

  return (
    <Box w="full">
      <Heading fontSize="2xl" mb="8">
        {title}
      </Heading>
      <List>{transactionsData}</List>
    </Box>
  )
}

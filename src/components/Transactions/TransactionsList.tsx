import { Box, Center, Heading, List, Spinner } from '@chakra-ui/react'
import { api } from '~/utils/api'
import { TransactionCard } from './TransactionCard'

interface TransactionListProps {
  title: string
  type: string
}

export function TransactionList({ title, type }: TransactionListProps) {
  const { data: transactions } = api.transactions.getAll.useQuery()
  const transactionsData = transactions
    ?.filter((transaction) => transaction.type.toLowerCase() === type)
    .slice(0, 8)
    .map((el) => <TransactionCard key={el.id} transaction={el} />)

  return (
    <Box w="full">
      <Heading fontSize={['xl', '2xl']} mb="8">
        {title}
      </Heading>
      <List>
        {!transactionsData && (
          <Center h="100vh">
            <Spinner />
          </Center>
        )}
        {transactionsData}
      </List>
    </Box>
  )
}

import { Transaction } from '@prisma/client'
import { TbCurrencyDollar } from 'react-icons/tb'
import { useGetCurrency } from '../../hooks/useGetCurrency'
import { useGetDate } from '../../hooks/useGetDate'
import { ListItem, Icon, Center, HStack, Box, Text } from '@chakra-ui/react'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { currency } = useGetCurrency(transaction.amount)
  const formattedDate = useGetDate(transaction.date)
  const transactionTypeColor = {
    income: 'green',
    outcome: 'red',
  }

  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      mb="5"
      pb="5"
      _notLast={{
        borderBottom: '1px solid',
        borderColor: 'gray.600',
      }}
    >
      <HStack align="center" spacing={4}>
        <Center
          bg={`${transactionTypeColor[transaction.type]}.400`}
          w="12"
          h="12"
          rounded="lg"
        >
          <Icon as={TbCurrencyDollar} color="white" fontSize="2xl" />
        </Center>
        <Box>
          <Text fontWeight="medium">{transaction.title}</Text>
          <Text color="gray.300">{formattedDate}</Text>
        </Box>
      </HStack>
      <Box>
        <Text
          color={`${transactionTypeColor[transaction.type]}.400`}
          fontWeight="semibold"
        >
          {currency}
        </Text>
      </Box>
    </ListItem>
  )
}

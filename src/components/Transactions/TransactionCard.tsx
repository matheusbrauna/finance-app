import { type Transaction } from '@prisma/client'
import { TbCurrencyDollar } from 'react-icons/tb'
import { ListItem, Icon, Center, HStack, Box, Text } from '@chakra-ui/react'
import { formatCurrency } from '../../functions/formatCurrency'
import { formatDate } from '../../functions/formatDate'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { currency } = formatCurrency(transaction.amount)
  const { formattedDate } = formatDate(transaction.createdAt)
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
      <HStack align="center" spacing={[2, 4]}>
        <Center
          bg={`${transactionTypeColor[transaction.type]}.400`}
          w="12"
          h="12"
          rounded="lg"
        >
          <Icon as={TbCurrencyDollar} color="white" fontSize="2xl" />
        </Center>
        <Box>
          <Text fontWeight="medium" fontSize={['sm', 'base']}>
            {transaction.title}
          </Text>
          <Text color="gray.300" fontSize={['xs', 'base']}>
            {formattedDate}
          </Text>
        </Box>
      </HStack>
      <Box>
        <Text
          color={`${transactionTypeColor[transaction.type]}.400`}
          fontWeight="semibold"
          fontSize={['sm', 'base']}
        >
          {currency}
        </Text>
      </Box>
    </ListItem>
  )
}

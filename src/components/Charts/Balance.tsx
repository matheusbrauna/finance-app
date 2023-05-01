import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { type Transaction } from '@prisma/client'
import dayjs from 'dayjs'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { api } from '../../utils/api'

export function Balance() {
  const { data: transactions } = api.transactions.getAll.useQuery()
  if (!transactions) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  function getMonth(date: Date) {
    return dayjs(date).format('DD/MM/YYYY HH:mm')
  }

  function getBalance(
    labels: any[],
    type: string,
    transactions: Transaction[],
  ) {
    return labels.map((label) =>
      transactions
        .filter((transaction) => getMonth(transaction.createdAt) === label)
        .filter((transaction) => transaction.type === type)
        .reduce((acc, item) => acc + item.amount, 0),
    )
  }

  const labels = [
    ...new Set(
      [...transactions].map((transaction) =>
        getMonth(new Date(transaction.createdAt)),
      ),
    ),
  ]

  const incomes = getBalance(labels, 'income', transactions)
  const expenses = getBalance(labels, 'outcome', transactions)

  const data = {
    labels,
    datasets: [
      {
        label: 'Entradas',
        data: incomes,
        backgroundColor: '#00b37e',
      },
      {
        label: 'Despesas',
        data: expenses,
        backgroundColor: '#f75a68',
      },
    ],
  }

  return (
    <Box>
      <Bar options={options} data={data} />
    </Box>
  )
}

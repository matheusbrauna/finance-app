import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Box, Center, Spinner } from '@chakra-ui/react'
import { api } from '~/utils/api'

export function CategoriesPie() {
  const { data: categories } = api.categories.getAll.useQuery()
  if (!categories) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  ChartJS.register(ArcElement, Tooltip, Legend)

  const labels = categories.map((category) => category.title)
  const amount = labels.map(
    (label) =>
      categories.find((category) => category.title === label)?.amount ?? 0,
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Valor acumulado',
        data: amount,
        backgroundColor: [
          '#f75a68',
          '#359EE5',
          '#FF9F40',
          '#4BC0C0',
          '#7F60F3',
        ],
      },
    ],
  }

  return (
    <Box>
      <Doughnut options={options} data={data} />
    </Box>
  )
}

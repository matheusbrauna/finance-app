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
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Transaction } from '../../store/@types/AppSlice'

export function Balance() {
  const { transactions } = useSelector((state: RootState) => state.app)
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  function getMonth(date: any) {
    return date?.toDate().toLocaleString('pt-BR', { month: 'long' })
  }

  function getBalance(
    labels: any[],
    type: string,
    transactions: Transaction[],
  ) {
    return labels.map((label) =>
      transactions
        .filter((transaction) => getMonth(transaction.date) === label)
        .filter((transaction) => transaction.type === type)
        .reduce((acc, item) => acc + item.amount, 0),
    )
  }

  const labels = [
    ...new Set(
      [...transactions]
        .sort((a, b) => a.date?.toDate() - b.date?.toDate())
        .map((transaction) => getMonth(transaction.date)),
    ),
  ]

  const incomes = getBalance(labels, 'income', transactions)
  const expenses = getBalance(labels, 'expense', transactions)

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
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

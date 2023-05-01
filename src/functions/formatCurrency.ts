const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

interface Currency {
  currency: string
}

export function formatCurrency(amount: number): Currency {
  const currency = currencyFormatter.format(amount)

  return {
    currency,
  }
}

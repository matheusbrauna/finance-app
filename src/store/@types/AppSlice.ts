export interface Category {
  id: string
  title: string
  percentage: number
  amount: number
}

export interface Transaction {
  id: string
  title: string
  type: string
  amount: number
  date: any
}

export interface AppSlice {
  categories: Category[]
  transactions: Transaction[]
}

import { Category } from './Category'

export interface UISliceProps {
  addAmount: {
    isVisible: boolean
    category: Category | null
  }
  subtractAmount: {
    isVisible: boolean
    category: Category | null
  }
  transferAmount: {
    isVisible: boolean
    category: Category | null
  }
  editCategory: {
    isVisible: boolean
    category: Category | null
  }
  addCategory: {
    isVisible: boolean
    category: Category | null
  }
  addSalary: {
    isVisible: boolean
    category: Category | null
  }
}

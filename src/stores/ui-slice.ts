import { Category } from '@prisma/client'
import { create } from 'zustand'

interface UISliceProps {
  addAmount: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  subtractAmount: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  transferAmount: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  editCategory: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  addCategory: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  addSalary: {
    isVisible: boolean
    category: Omit<Category, 'createdAt'> | null
  }
  toggleAddAmount: (category: Omit<Category, 'createdAt'> | null) => void
  toggleSubtractAmount: (category: Omit<Category, 'createdAt'> | null) => void
  toggleTransferAmount: (category: Omit<Category, 'createdAt'> | null) => void
  toggleEditCategory: (category: Omit<Category, 'createdAt'> | null) => void
  toggleAddCategory: (category: Omit<Category, 'createdAt'> | null) => void
  toggleAddSalary: (category: Omit<Category, 'createdAt'> | null) => void
}

const initialState = {
  addAmount: {
    isVisible: false,
    category: null,
  },
  subtractAmount: {
    isVisible: false,
    category: null,
  },
  transferAmount: {
    isVisible: false,
    category: null,
  },
  editCategory: {
    isVisible: false,
    category: null,
  },
  addCategory: {
    isVisible: false,
    category: null,
  },
  addSalary: {
    isVisible: false,
    category: null,
  },
}

export const useUiSlice = create<UISliceProps>((set) => ({
  ...initialState,
  toggleAddAmount: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      addAmount: {
        isVisible: !state.addAmount.isVisible,
        category,
      },
    })),
  toggleSubtractAmount: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      subtractAmount: {
        isVisible: !state.subtractAmount.isVisible,
        category,
      },
    })),
  toggleTransferAmount: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      transferAmount: {
        isVisible: !state.transferAmount.isVisible,
        category,
      },
    })),
  toggleEditCategory: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      editCategory: {
        isVisible: !state.editCategory.isVisible,
        category,
      },
    })),
  toggleAddCategory: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      addCategory: {
        isVisible: !state.addCategory.isVisible,
        category,
      },
    })),
  toggleAddSalary: (category: Omit<Category, 'createdAt'> | null) =>
    set((state) => ({
      ...state,
      addSalary: {
        isVisible: !state.addSalary.isVisible,
        category,
      },
    })),
}))

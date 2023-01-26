import { Category } from '@prisma/client'
import { create } from 'zustand'

interface UISliceProps {
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
  toggleAddAmount: (category: Category | null) => void
  toggleSubtractAmount: (category: Category | null) => void
  toggleTransferAmount: (category: Category | null) => void
  toggleEditCategory: (category: Category | null) => void
  toggleAddCategory: (category: Category | null) => void
  toggleAddSalary: (category: Category | null) => void
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
  toggleAddAmount: (category: Category | null) =>
    set((state) => ({
      ...state,
      addAmount: {
        isVisible: !state.addAmount.isVisible,
        category,
      },
    })),
  toggleSubtractAmount: (category: Category | null) =>
    set((state) => ({
      ...state,
      subtractAmount: {
        isVisible: !state.subtractAmount.isVisible,
        category,
      },
    })),
  toggleTransferAmount: (category: Category | null) =>
    set((state) => ({
      ...state,
      transferAmount: {
        isVisible: !state.transferAmount.isVisible,
        category,
      },
    })),
  toggleEditCategory: (category: Category | null) =>
    set((state) => ({
      ...state,
      editCategory: {
        isVisible: !state.editCategory.isVisible,
        category,
      },
    })),
  toggleAddCategory: (category: Category | null) =>
    set((state) => ({
      ...state,
      addCategory: {
        isVisible: !state.addCategory.isVisible,
        category,
      },
    })),
  toggleAddSalary: (category: Category | null) =>
    set((state) => ({
      ...state,
      addSalary: {
        isVisible: !state.addSalary.isVisible,
        category,
      },
    })),
}))

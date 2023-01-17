import { createSlice } from '@reduxjs/toolkit'
import { AppSlice } from '../@types/AppSlice'

const initialState: AppSlice = {
  categories: [],
  transactions: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload
    },
  },
})

export const { setCategories, setTransactions } = appSlice.actions

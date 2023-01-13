import { createSlice } from '@reduxjs/toolkit'
import { AppSlice } from '../@types/AppSlice'

const initialState: AppSlice = {
  categories: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = appSlice.actions

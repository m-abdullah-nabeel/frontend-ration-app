import { createSlice } from '@reduxjs/toolkit'

export const stockSlice = createSlice({
  name: 'stock',
  initialState: [],
  reducers: {
    // add: (state) => {
    //   state = [...state, title]
    // },
    add: {
        reducer: (state, action) => {
          state.push(action.payload)
    }},  
    remove: (state) => {
      state.value = [...state.value, title]
    },
  },
})

export const { add, remove } = stockSlice.actions

export default stockSlice.reducer
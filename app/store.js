import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import stockSlice from '../states/stock';

export default configureStore({
  reducer: {
    counter: counterReducer,
    stock: stockSlice,
  },
})

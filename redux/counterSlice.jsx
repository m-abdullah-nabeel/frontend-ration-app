import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: { counter: 0 },
    reducers: {
        increment(state, action) {
            state.counter++;
        },
        decrement(state, action) {
            state.counter--;
        },
        addFactor(state, action) {
            state.counter += action.payload
        },
    }
})

export const { increment, decrement, addFactor } = counterSlice.actions;

export const selectCounter = (state) => state.animalInput;

export default counterSlice.reducer;

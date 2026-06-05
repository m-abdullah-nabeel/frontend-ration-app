import { configureStore, createSlice } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import animalInputReducer from "./animalInputSlice";
import speciesReducer from "./speciesSlice";

const store = configureStore({
    reducer: {
        counter: counterSlice,
        animalInput: animalInputReducer,
        species: speciesReducer,
    }
})

export default store
// feedFormulationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nutrientRequirements: {
    cp_req: '',
  },
  ingredients: [
    // Ingredients with or without categories to be done later
  ],
  results: {
    // Define initial structure for results if needed
  },
};

const feedFormulationSlice = createSlice({
  name: 'animalInput',
  initialState,
  reducers: {
    setNutrientRequirements: (state, action) => {
      state.nutrientRequirements = { ...state.nutrientRequirements, ...action.payload };
    },
    addIngredients: (state, action) => {
      // Ensure action.payload is an object
      if (typeof action.payload === 'object' && action.payload !== null) {
        state.ingredients.push(action.payload);
      }
    },
    updateIngredient: (state, action) => {
      // Ensure action.payload is an object with properties to match
      if (typeof action.payload === 'object' && action.payload !== null) {
        const { name, updatedProperties } = action.payload;
        alert(JSON.stringify(action.payload))

        state.ingredients = state.ingredients.map(item => {
          if (item[name] === action.payload[name]) {
            return { ...item, ...updatedProperties };
          }
          return item;
        });  
      }
    },
    removeIngredient: (state, action) => {
      // Ensure action.payload is the specific item to remove
      state.ingredients = state.ingredients.filter(item => item.name !== action.payload.name);
    },
    
    setResults: (state, action) => {
      state.results = { ...state.results, ...action.payload };
    },
    resetAnimalInput: (state) => initialState,
  },
});

export const { setNutrientRequirements, addIngredients, updateIngredient, removeIngredient, setResults, resetAnimalInput } = feedFormulationSlice.actions;

export const selectFeedFormulationData = (state) => state.animalInput;

export default feedFormulationSlice.reducer;

// feedFormulationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nutrientRequirements: {},
  ingredients: [
    // Ingredients with or without categories to be done later
  ],
  // results: {
  //   // Define initial structure for results if needed
  // },
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
      console.log("Inside updateIngredient reducer");
      
      if (typeof action.payload === 'object' && action.payload !== null) {
        console.log("Right Input");
        console.log("Payload:", JSON.stringify(action.payload));
    
        const { name, ...updatedProperties } = action.payload;
        console.log("Name:", name);
        console.log("Updated Properties:", updatedProperties);
    
        state.ingredients = state.ingredients.map(item => {
          if (item[name] === action.payload[name]) {
            console.log("Updating item:", item);
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

// speciesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSpecies: '',
};

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    setSpecies: (state, action) => {
      state.selectedSpecies = action.payload;
    },
  },
});

export const { setSpecies } = speciesSlice.actions;

export const selectSpecies = (state) => state.species.selectedSpecies;

export default speciesSlice.reducer;

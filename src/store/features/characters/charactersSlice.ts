import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CharactersState {}

const initialState: CharactersState = {};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  selectors: {},
});

// Action creators are generated for each case reducer function
export const {} = charactersSlice.actions;

export default charactersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "AISearch",
  initialState: {
    isGptSearch: false,
    movieSearchResults: [],
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.isGptSearch = !state.isGptSearch;
    },
    resetSearch: (state) => {
      state.isGptSearch = false;
    },
    addMovieSearchResults: (state, action) => {
      state.movieSearchResults = action.payload;
    },
    clearMovieSearchResults: (state) => {
      state.movieSearchResults.length = 0;
    },
  },
});
export const {
  toggleGptSearch,
  resetSearch,
  addMovieSearchResults,
  clearMovieSearchResults,
} = gptSlice.actions;
export default gptSlice.reducer;

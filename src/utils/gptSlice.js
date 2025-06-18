import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "AISearch",
  initialState: {
    isGptSearch: false,
    movieSearchResults: null,
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
  },
});
export const { toggleGptSearch, resetSearch, addMovieSearchResults } =
  gptSlice.actions;
export default gptSlice.reducer;

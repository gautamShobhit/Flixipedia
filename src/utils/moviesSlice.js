import { createSlice } from "@reduxjs/toolkit";

const moviesSLice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideos: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideos: (state, action) => {
      state.trailerVideos = action.payload;
    },
  },
});
export const { addNowPlayingMovies, addTrailerVideos } = moviesSLice.actions;
export default moviesSLice.reducer;

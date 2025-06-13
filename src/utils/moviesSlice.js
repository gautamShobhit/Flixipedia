import { createSlice } from "@reduxjs/toolkit";

const moviesSLice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    upcomingMovies: null,
    topRatedMovies: null,
    popularMovies: null,
    trailerVideos: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideos: (state, action) => {
      state.trailerVideos = action.payload;
    },
    clearTrailerVideo: (state) => {
      state.trailerVideos = null;
    },
  },
});
export const {
  addPopularMovies,
  addTopRatedMovies,
  addNowPlayingMovies,
  addTrailerVideos,
  clearTrailerVideo,
  addUpcomingMovies,
} = moviesSLice.actions;
export default moviesSLice.reducer;

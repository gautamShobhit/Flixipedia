import { createSlice } from "@reduxjs/toolkit";

const movieInfoSlice = createSlice({
  name: "movieInfo",
  initialState: {
    isMoviePage: false,
    movieDetails: [],
    trailerVideo: [],
    castInfo: [],
    movieReviews: [],
  },
  reducers: {
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },

    toggleIsMoviePage: (state, action) => {
      state.isMoviePage = !state.isMoviePage;
    },
    resetMovieDetails: (state, action) => {
      state.isMoviePage = false;
      //yaha phsa tha
      state.movieDetails = [];
      state.trailerVideo = [];
      state.castInfo = [];
      state.movieReviews = [];
    },
    addTrailer: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addCastInfo: (state, action) => {
      state.castInfo = action.payload;
    },
    addMovieReviews: (state, action) => {
      state.movieReviews = action.payload;
    },
  },
});
export const {
  addMovieDetails,
  toggleIsMoviePage,
  resetMovieDetails,
  addTrailer,
  addCastInfo,
  addMovieReviews,
} = movieInfoSlice.actions;
export default movieInfoSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptSearchReducer from "./gptSlice";
import movieInfoReducer from "./movieInfoSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    search: gptSearchReducer,
    movieInfo: movieInfoReducer,
  },
});
export default appStore;

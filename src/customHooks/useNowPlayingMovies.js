//Used to make API call for movies
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  //before making api call, we will check if store already has this data or not
  const nowPlayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addNowPlayingMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  //Only make an api call if nowPlayingMovies is empty
  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};
export default useNowPlayingMovies;

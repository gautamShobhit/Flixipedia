//Used to make API call for movies
import { useDispatch, useSelector } from "react-redux";
//import {  } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
  const getTopRatedMovies = async () => {
    const data = await fetch("/api/tmdb?path=/movie/top_rated&page=1");
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addTopRatedMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;

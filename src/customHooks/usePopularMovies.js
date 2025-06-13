//Used to make API call for movies
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addPopularMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  useEffect(() => {
    getPopularMovies();
  }, []);
};
export default usePopularMovies;

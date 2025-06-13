//Used to make API call for movies
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addTopRatedMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;

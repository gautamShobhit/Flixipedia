//Used to make API call for movies
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addUpcomingMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;

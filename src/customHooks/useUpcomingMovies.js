//Used to make API call for movies
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch("/api/tmdb?path=/movie/upcoming&page=1");
    const json = await data.json();
    //Adding api data to redux store
    dispatch(addUpcomingMovies(json.results));
  };
  //since we only have to fetch API once and after the page loads
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;

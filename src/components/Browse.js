import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import usePopularMovies from "../customHooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

const Browse = () => {
  //Makes API call for movies and dispatch action to add movies list in slice
  useNowPlayingMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  usePopularMovies();

  //subscribe to the store for getting GptSearch Component
  const showGptSearch = useSelector((store) => store.search?.isGptSearch);
  const isMoviePage = useSelector((store) => store.movieInfo.isMoviePage);

  return (
    <div className="overflow-x-hidden">
      <Header />
      {isMoviePage ? (
        <Outlet />
      ) : showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {/* Either both true that is when user search and select a movie or isMoviePage true when a user directly selects one of the movie from browse page */}
    </div>
  );
};
export default Browse;

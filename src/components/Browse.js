// src/components/Browse.js
import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const Browse = () => {
  // ONLY fetch what is visible immediately (Above the Fold)
  useNowPlayingMovies();
  useUpcomingMovies();

  // REMOVED useTopRatedMovies and usePopularMovies from here!

  const showGptSearch = useSelector((store) => store.search?.isGptSearch);
  const isMoviePage = useSelector((store) => store.movieInfo.isMoviePage);

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
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
    </div>
  );
};
export default Browse;

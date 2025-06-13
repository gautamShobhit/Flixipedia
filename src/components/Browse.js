import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import usePopularMovies from "../customHooks/usePopularMovies";

const Browse = () => {
  //Makes API call for movies and dispatch action to add movies list in slice
  useNowPlayingMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  usePopularMovies();
  return (
    <div className="overflow-hidden">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};
export default Browse;

import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  //Makes API call for movies and dispatch action to add movies list in slice
  useNowPlayingMovies();
  return (
    <div className="overflow-hidden">
      <Header />
      <MainContainer />
      {/* <SecondaryContainer /> */}
    </div>
  );
};
export default Browse;

import { useSelector } from "react-redux";
import MovieTile from "./MovieTile";
import Shimmer from "./Shimmer";

const MovieSuggestions = () => {
  const movieList = useSelector((store) => store.search?.movieSearchResults);

  return movieList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" pt-4  flex flex-wrap justify-center">
      {movieList?.map(
        (movie) =>
          // here movie could be null for some broken API
          // hence we need to pass a check first and then render each movie tile
          movie && <MovieTile key={movie?.original_title} movieInfo={movie} />
      )}
    </div>
  );
};
export default MovieSuggestions;

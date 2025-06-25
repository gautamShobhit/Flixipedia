import { useSelector } from "react-redux";
import MovieTile from "./MovieTile";
import Shimmer from "./Shimmer";

const MovieSuggestions = () => {
  const movieList = useSelector((store) => store.search?.movieSearchResults);

  return movieList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" pt-4  flex flex-wrap justify-center">
      {movieList?.map((movie) => (
        <MovieTile key={movie?.id} movieInfo={movie} />
      ))}
    </div>
  );
};
export default MovieSuggestions;

import { useSelector } from "react-redux";
import MovieTile from "./MovieTile";

const MovieSuggestions = () => {
  const movieList = useSelector((store) => store.search?.movieSearchResults);
  return (
    <div className=" pt-4  flex flex-wrap justify-center">
      {movieList?.map((movie) => (
        <MovieTile key={movie?.id} movieInfo={movie} />
      ))}
    </div>
  );
};
export default MovieSuggestions;

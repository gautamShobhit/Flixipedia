import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { toggleIsMoviePage } from "../utils/movieInfoSlice";
import { useDispatch } from "react-redux";
import { resetSearch } from "../utils/gptSlice";
const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();

  //-->Early return : Since it takes time to fetch movies and hence we have to wait till we get the list
  if (!movies) return null;
  return (
    <div className="md:p-4 p-2 ">
      <h1 className="md:pb-4 pb-2 md:text-xl text-sm font-semibold text-white">
        {title}
      </h1>
      <div className=" flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <Link
              key={movie?.id}
              to={"/browse/movie/" + movie?.id}
              className="block"
              onClick={() => {
                dispatch(toggleIsMoviePage());
                dispatch(resetSearch());
              }}
            >
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;

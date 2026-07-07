import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useFirstInteraction from "../customHooks/useFirstInteraction";

// Hooks
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import usePopularMovies from "../customHooks/usePopularMovies";

// Safely runs the hook ONLY when rendered
const DeferredMovieRow = ({ title, movies, useFetchHook }) => {
  useFetchHook();
  return <MovieList title={title} movies={movies} />;
};

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const hasInteracted = useFirstInteraction(); // Tracks if user scrolled/moved mouse

  return (
    movies && (
      <div className="md:-mt-48 -mt-16 relative md:pl-10 pl-2 overflow-x-hidden z-20">
        {/* Rendered immediately (Above the Fold) */}
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

        {/* Rendered ONLY after the user scrolls or moves mouse */}
        {hasInteracted && (
          <>
            <DeferredMovieRow
              title={"Top Rated"}
              movies={movies.topRatedMovies}
              useFetchHook={useTopRatedMovies}
            />
            <DeferredMovieRow
              title={"Popular"}
              movies={movies.popularMovies}
              useFetchHook={usePopularMovies}
            />
          </>
        )}
      </div>
    )
  );
};
export default SecondaryContainer;

import MovieCard from "./MovieCard";
const MovieList = ({ title, movies }) => {
  //-->Early return : Since it takes time to fetch movies and hence we have to wait till we get the list
  if (!movies) return null;
  return (
    <div className="p-4">
      <h1 className="pb-4 text-xl font-semibold text-white">{title}</h1>
      <div className=" flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;

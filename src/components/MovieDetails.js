import ActorCard from "./ActorCard";
import { useSelector } from "react-redux";

const MovieDetails = ({ details }) => {
  const cast = useSelector((store) => store.movieInfo?.castInfo);
  const {
    original_title,
    overview,
    tagline,
    runtime,
    genres,
    status,
    production_companies,
    vote_average,
  } = details;
  return (
    <div className="w-5/6 mx-auto relative z-10 mt-[34%] p-2 text-gray-300">
      <h1 className="text-5xl font-bold text-right mr-4 mb-2">
        {original_title}
      </h1>
      <p className="text-lg text-right mr-4">{tagline}</p>
      <div className="flex mt-7">
        <div className="mr-4 w-3/4 border-b border-white shadow-md shadow-red-400 rounded-lg p-2 text-lg bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
          <p className="">Sneakpeak : {overview}</p>
        </div>
        <div className="w-1/4 border-b border-white shadow-md shadow-red-400 rounded-lg p-2 text-sm bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
          <h1>Genres : {genres?.map((genre) => genre.name).join(", ")}</h1>
          <h1>Status : {status}</h1>
          <h1>Runtime : {runtime} mins</h1>
          <h1>
            Production :{" "}
            {production_companies?.map((company) => company.name).join(", ")}
          </h1>
          <h1>Average Rating : {vote_average} ⭐</h1>
        </div>
      </div>
      <div className="mt-4 w-full border-b border-white shadow-md shadow-red-400 rounded-lg p-2 text-lg bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
        <h1>Meet the Cast</h1>
        <div className="h-64 mt-2 flex ml-4 overflow-x-scroll scrollbar-hide">
          <div className="flex">
            {cast.map((actor) => (
              <ActorCard key={actor?.id} actor={actor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;

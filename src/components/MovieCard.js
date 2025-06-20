import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const moviePoster = movie.poster_path;
  return (
    <div className="md:ml-4 ml-2 md:w-40 w-20">
      <img
        className="rounded-md"
        src={IMG_CDN_URL + moviePoster}
        alt="Movie Poster"
      />
    </div>
  );
};
export default MovieCard;

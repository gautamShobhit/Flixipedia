import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const moviePoster = movie.poster_path;
  return (
    <div className="ml-4 w-40 ">
      <img
        className="rounded-md "
        src={IMG_CDN_URL + moviePoster}
        alt="Movie Poster"
      />
    </div>
  );
};
export default MovieCard;

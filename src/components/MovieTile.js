import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { toggleIsMoviePage } from "../utils/movieInfoSlice";
import { Link } from "react-router-dom";
import { resetSearch } from "../utils/gptSlice";
import { useState } from "react";

/**
 * `MovieTile` Component
 * Displays a single movie as a tile, including its poster, title, plot, ratings, and an AI-generated reason for recommendation.
 * Allows navigation to a detailed movie page and handles Redux state updates for search and movie page views.
 * @param {object} props - The component's properties.
 * @param {object} props.movieInfo - An object containing details about the movie.
 */
const MovieTile = ({ movieInfo }) => {
  // Initialize Redux dispatch for sending actions to the store.
  const dispatch = useDispatch();

  // Destructure movie details from movieInfo prop for easier access.
  const {
    id, // Unique identifier for the movie
    original_title, // Original title of the movie
    overview, // Plot summary of the movie
    poster_path, // Path to the movie's poster image
    vote_average, // Average vote score from TMDB
    release_date, // Release date of the movie
    aiReason, // AI-generated reason for recommending the movie
  } = movieInfo;

  // State to control the visibility of the AI recommendation reason.
  const [isReason, setIsReason] = useState(false);

  return (
    <div className="group flex text-gray-300 border-b border-white shadow-lg shadow-red-400 rounded-lg md:w-5/12 w-full mx-4 my-4 md:mx-8 md:h-80 h-48 bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:scale-105 ">
      <div className=" w-2/6 flex justify-center p-2 relative ">
        <Link
          to={"/browse/movie/" + id}
          className="block relative w-full h-full "
        >
          <img
            className=" w-full h-full rounded-lg object-cover"
            src={IMG_CDN_URL + poster_path}
            alt="Poster"
            onClick={() => {
              dispatch(toggleIsMoviePage());
              dispatch(resetSearch());
            }}
          />
          <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-black to-transparent text-center rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <h1 className="text-white font-semibold md:text-xs text-[9px] md:pt-9 pt-4 ">
              Click to Explore
            </h1>
          </div>
        </Link>
      </div>
      <div className="w-4/6 border border-gray-400 m-2 ml-0 rounded-lg transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900 overflow-y-scroll scrollbar-hide">
        <h1 className=" text-center font-bold md:text-xl text-base mt-2 mx-2">
          {original_title}
        </h1>
        <h2 className=" text-center font-semibold mt-2 md:text-base text-sm">
          Release Date 📅 : {release_date}
        </h2>
        <p className="md:text-sm text-xs mt-4 md:text-justify text-left md:mx-4 mx-2">
          Plot 📽️ : {overview}
        </p>
        <p className=" md:text-sm text-xs font-semibold md:m-4 m-2">
          Avg. Ratings : {vote_average?.toFixed(1)}/10 ⭐
        </p>
        <div
          className="border border-gray-400 md:text-sm text-xs font-semibold md:m-4 m-2 p-2 mt-4 rounded-lg text-center cursor-pointer select-none"
          onClick={() => setIsReason(!isReason)}
        >
          <h1 className="flex justify-between">
            Why this movie? ✨
            <span
              className={` ml-2 transition-transform duration-300 ease-in-out ${
                isReason ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </h1>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
              isReason ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
            style={{
              // allow long reasons to animate nicely, tweak as needed
              maxHeight: isReason ? "12rem" : "0",
            }}
            aria-expanded={isReason}
          >
            <p className="md:text-sm text-xs font-normal text-left">
              {aiReason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieTile;

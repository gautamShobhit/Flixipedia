import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { toggleIsMoviePage } from "../utils/movieInfoSlice";
import { Link } from "react-router-dom";
import { resetSearch } from "../utils/gptSlice";

const MovieTile = ({ movieInfo }) => {
  const dispatch = useDispatch();
  //destructure this info
  const {
    id,
    original_title,
    overview,
    poster_path,
    vote_average,
    release_date,
  } = movieInfo;
  return (
    <div className="flex text-gray-300 border-b border-white shadow-lg shadow-red-400 rounded-lg md:w-5/12 w-full mx-4 my-4 md:mx-8 md:h-80 h-48 bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:scale-105 ">
      <div className=" w-2/6 flex justify-center p-2">
        <Link to={"/browse/movie/" + id} className="block">
          <img
            className="w-full h-full rounded-lg object-cover "
            src={IMG_CDN_URL + poster_path}
            alt="Poster"
            onClick={() => {
              dispatch(toggleIsMoviePage());
              dispatch(resetSearch());
            }}
          />
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
          Avg. Ratings : {vote_average} ⭐
        </p>
      </div>
    </div>
  );
};
export default MovieTile;

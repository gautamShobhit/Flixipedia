import { IMG_CDN_URL } from "../utils/constants";

const MovieTile = ({ movieInfo }) => {
  //destructure this info
  const { original_title, overview, poster_path, vote_average, release_date } =
    movieInfo;
  return (
    <div className="flex text-gray-300 border-b border-gray-400 shadow-md shadow-gray-500 rounded-lg md:w-5/12 w-full mx-4 my-4 md:mx-8 md:h-80 h-48 bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:scale-105 ">
      <div className=" w-2/6 flex justify-center py-2  ">
        <img
          className="w-[95%] rounded-lg ml-2"
          src={IMG_CDN_URL + poster_path}
          alt="Poster"
        />
      </div>
      <div className="w-4/6 border border-gray-400 m-2 rounded-lg transition-all ease-in-out duration-200 delay-75 hover:bg-gray-700 overflow-y-scroll scrollbar-hide">
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
          Avg. Likes 👍 : {vote_average}
        </p>
      </div>
    </div>
  );
};
export default MovieTile;

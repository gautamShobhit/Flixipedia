import { IMG_CDN_URL } from "../utils/constants";
import ActorCard from "./ActorCard";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

const MovieDetails = ({ details, reviews }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(false);
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
    poster_path,
  } = details;
  return (
    <div className="md:w-5/6 w-11/12 mx-auto relative z-20 md:mt-[33%] mt-[48%] p-2 text-gray-300 ">
      <div className="w-full">
        <h1 className="md:text-[43px] text-[16px] font-bold text-right md:mr-4 mr-[1px] md:mb-2">
          {original_title}
        </h1>
        <div className="flex justify-end  ">
          <p className="md:text-base text-[8px] text-right md:mr-4 mr-[1px] w-5/6 md:mb-0 mb-8">
            {tagline}
          </p>
        </div>
      </div>
      <div className="md:flex md:mt-16">
        <div className=" md:mr-4 md:w-3/4 w-full border-b border-white shadow-lg shadow-red-400 rounded-lg p-2 md:text-lg text-[15px] bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900 ">
          <p className="">Sneakpeak : {overview}</p>
        </div>
        <div className="md:w-1/4 ">
          <div className="absolute w-1/2 z-20 md:hidden pr-4">
            <img
              className="rounded-2xl object-cover border-b border-white shadow-red-400 shadow-lg "
              src={IMG_CDN_URL + poster_path}
              alt="Movie Poster"
            />
          </div>
          <div className="md:ml-0 ml-[50%] md:mt-0 mt-5 md:w-full w-1/2 border-b border-white shadow-lg shadow-red-400  rounded-lg p-2 md:text-sm text-[12px] bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
            <h1>Genres : {genres?.map((genre) => genre.name).join(", ")}</h1>
            <h1>Status : {status}</h1>
            <h1>Runtime : ⌛ {runtime} mins</h1>
            <h1 className="hidden md:block">
              Production :{" "}
              {production_companies?.map((company) => company.name).join(", ")}
            </h1>
            <h1>Average Rating : ⭐ {vote_average?.toFixed(1)}/10</h1>
          </div>
        </div>
      </div>

      <div className="md:ml-0 ml-[50%] md:mt-4 mt-3 md:mb-6 md:w-full w-1/2 border-b border-white shadow-lg shadow-red-400 rounded-lg p-2 md:text-lg text-[10px] bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
        <h1>Meet the Cast</h1>
        <div className=" md:mt-2 mt-[2px] flex md:ml-4 ml-2 overflow-x-scroll scrollbar-hide">
          <div className="flex  ">
            {cast.map((actor) => (
              <ActorCard key={actor?.id} actor={actor} />
            ))}
          </div>
        </div>
      </div>

      <div className="md:mt-4 mt-4 mb-8 w-full border-b border-white shadow-lg shadow-red-400 rounded-lg p-2 md:text-base text-[9px] bg-black bg-opacity-80 transition-all ease-in-out duration-200 delay-75 hover:bg-gray-900">
        <div className="flex justify-between">
          {expandedReviews ? "Reviews " : "What others say about this movie ?"}
          <button
            className="transition-all ease-in-out duration-200 delay-75 hover:scale-90"
            onClick={() => {
              setExpandedReviews(!expandedReviews);
            }}
          >
            {expandedReviews ? "Collapse ⬆️" : "Expand ⬇️"}
          </button>
        </div>
        {expandedReviews
          ? reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review.content}
                author={review.author_details}
                isExpanded={index === isExpanded ? true : false}
                setIsExpanded={setIsExpanded}
                index={index}
              />
            ))
          : " "}
      </div>
    </div>
  );
};
export default MovieDetails;

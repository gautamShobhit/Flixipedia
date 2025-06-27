import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import flixipediaBg from "../assets/flixipediaBg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addCastInfo,
  addMovieDetails,
  addTrailer,
} from "../utils/movieInfoSlice";
import MovieVideoBg from "./MovieVideoBg";
import MovieDetails from "./MovieDetails";

const MovieInfo = () => {
  const { movieId } = useParams();
  const trailer = useSelector((store) => store.movieInfo?.trailerVideo);
  const movieDetails = useSelector((store) => store.movieInfo?.movieDetails);
  const { poster_path } = movieDetails;
  const dispatch = useDispatch();
  const getMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId,
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addMovieDetails(json));
  };
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const trailerVideo = filteredData.length
      ? filteredData[0]
      : json.results.filter((videos) => videos.type === "Teaser")[0];
    dispatch(addTrailer(trailerVideo));
  };
  const getCastInfo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/credits",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addCastInfo(json.cast));
  };
  useEffect(() => {
    getMovieDetails();
    getMovieTrailer();
    getCastInfo();
  }, [movieId]);

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="md:w-screen h-screen object-cover z-10 fixed inset-0 bg-black bg-opacity-40 "></div>
      <img
        className="md:w-screen h-screen object-cover fixed "
        src={flixipediaBg}
        alt="Background Img"
      />
      <div className="md:mt-0 mt-[10%]">
        <MovieVideoBg poster={poster_path} trailer={trailer} />
        <MovieDetails details={movieDetails} />
      </div>
    </div>
  );
};
export default MovieInfo;

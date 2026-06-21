import { useParams } from "react-router-dom";
import { useEffect } from "react";
import flixipediaBg from "../assets/flixipediaBg.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addCastInfo,
  addMovieDetails,
  addMovieReviews,
  addTrailer,
} from "../utils/movieInfoSlice";
import MovieVideoBg from "./MovieVideoBg";
import MovieDetails from "./MovieDetails";

const MovieInfo = () => {
  const { movieId } = useParams();
  const trailer = useSelector((store) => store.movieInfo?.trailerVideo);
  const movieDetails = useSelector((store) => store.movieInfo?.movieDetails);
  const movieReviews = useSelector((store) => store.movieInfo?.movieReviews);
  const { poster_path } = movieDetails;
  const dispatch = useDispatch();
  const getMovieDetails = async () => {
    const data = await fetch("/api/tmdb?path=/movie/" + movieId);
    const json = await data.json();

    dispatch(addMovieDetails(json));
  };
  const getMovieTrailer = async () => {
    const data = await fetch("/api/tmdb?path=/movie/" + movieId + "/videos");
    const json = await data.json();
    const filteredData = json.results.filter(
      (videos) => videos.type === "Trailer",
    );
    const trailerVideo = filteredData.length
      ? filteredData[0]
      : json.results.filter((videos) => videos.type === "Teaser")[0];
    dispatch(addTrailer(trailerVideo));
  };
  const getCastInfo = async () => {
    const data = await fetch("/api/tmdb?path=/movie/" + movieId + "/credits");
    const json = await data.json();
    dispatch(addCastInfo(json.cast));
  };
  const getMovieReviews = async () => {
    const data = await fetch("/api/tmdb?path=/movie/" + movieId + "/reviews");
    const json = await data.json();
    dispatch(addMovieReviews(json.results));
  };
  useEffect(() => {
    getMovieDetails();
    getMovieTrailer();
    getCastInfo();
    getMovieReviews();
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
        <MovieDetails details={movieDetails} reviews={movieReviews} />
      </div>
    </div>
  );
};
export default MovieInfo;
